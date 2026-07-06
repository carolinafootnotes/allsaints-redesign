#!/usr/bin/env python3
"""
Build a WordPress WXR file for the Memorial Arboretum trees, for import into a
Squarespace Blog Collection slugged `arboretum` (preserves /arboretum/[tree] QR URLs).

Source of truth:
  - Tree slugs: the approved prototype index (worker/public/final/arboretum/index.html)
  - Tree content: the WordPress export (assets/wordpress-export/*.xml), where each tree
    is already an individual post_type=post whose post_name matches the prototype slug.

Outputs (written next to this script):
  - arboretum.wxr            all matched trees
  - arboretum-TEST-1-tree.wxr  marshall-smith only (import this FIRST to verify the URL)

Faithful extraction: we keep each source <item> block verbatim (CDATA and all), so the
memorial dedications + species writeups import exactly as the church wrote them. We only
select the right items and wrap them in a fresh channel.

Run:  python3 make-arboretum-wxr.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
INDEX = os.path.join(REPO, "worker/public/final/arboretum/index.html")
WPXML = os.path.join(REPO, "assets/wordpress-export/allsaintsepiscopalchurch.WordPress.2026-05-27.xml")
OUT_ALL = os.path.join(HERE, "arboretum.wxr")
OUT_TEST = os.path.join(HERE, "arboretum-TEST-1-tree.wxr")
TEST_SLUG = "marshall-smith"


def read(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def tree_slugs(index_html):
    slugs = re.findall(r'href="/final/arboretum/([a-z0-9-]+)/"', index_html)
    # preserve prototype order, de-dupe
    seen, ordered = set(), []
    for s in slugs:
        if s not in seen:
            seen.add(s)
            ordered.append(s)
    return ordered


def slug_of(item):
    m = re.search(r"<wp:post_name><!\[CDATA\[(.*?)\]\]></wp:post_name>", item, re.S)
    return m.group(1) if m else None


def type_of(item):
    m = re.search(r"<wp:post_type><!\[CDATA\[(.*?)\]\]></wp:post_type>", item, re.S)
    return m.group(1) if m else None


def main():
    for p in (INDEX, WPXML):
        if not os.path.exists(p):
            sys.exit(f"missing source: {p}")

    index_html = read(INDEX)
    xml = read(WPXML)

    slugs = tree_slugs(index_html)
    # preamble = everything before the first <item> (rss open + channel meta + namespaces)
    first = xml.index("<item>")
    preamble = xml[:first]

    items = re.findall(r"<item>.*?</item>", xml, re.S)
    by_slug = {}
    for it in items:
        if type_of(it) == "post":
            s = slug_of(it)
            if s and s not in by_slug:  # first post wins (attachments are excluded above)
                by_slug[s] = it

    matched, missing = [], []
    for s in slugs:
        (matched if s in by_slug else missing).append(s)

    footer = "\n</channel>\n</rss>\n"

    def write_wxr(path, chosen_slugs):
        chunks = [preamble.rstrip()]
        for s in chosen_slugs:
            chunks.append("\n\t" + by_slug[s].strip())
        with open(path, "w", encoding="utf-8") as f:
            f.write("".join(chunks) + footer)

    write_wxr(OUT_ALL, matched)
    write_wxr(OUT_TEST, [TEST_SLUG] if TEST_SLUG in by_slug else [])

    print(f"prototype tree slugs : {len(slugs)}")
    print(f"matched WP posts     : {len(matched)}")
    print(f"missing (no WP post) : {len(missing)} {missing if missing else ''}")
    print(f"wrote {OUT_ALL}")
    print(f"wrote {OUT_TEST} (slug: {TEST_SLUG})")
    # thin-content warning: flag any tree whose content:encoded is very short
    thin = []
    for s in matched:
        m = re.search(r"<content:encoded><!\[CDATA\[(.*?)\]\]></content:encoded>", by_slug[s], re.S)
        body = (m.group(1) if m else "").strip()
        if len(body) < 120:
            thin.append((s, len(body)))
    if thin:
        print("\nTHIN CONTENT (review before go-live):")
        for s, n in thin:
            print(f"  {s}: {n} chars")


if __name__ == "__main__":
    main()
