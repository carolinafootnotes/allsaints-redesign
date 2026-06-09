#!/usr/bin/env python3
"""Convert a Markdown file to a clean, styled PDF.

Usage:
    python3 md2pdf.py INPUT.md OUTPUT.pdf [--title "Document Title"]

Pipeline: Markdown is converted to styled HTML, then Google Chrome in
headless mode prints that HTML to PDF. No third-party Python packages are
required; only a Chromium-family browser needs to be installed.

Supported Markdown: ATX headings (# ## ### ...), bold, italic, inline code,
links, unordered and ordered lists, task-list checkboxes (- [ ] / - [x]),
GitHub-style pipe tables, blockquotes, horizontal rules, fenced code blocks,
and paragraphs. This is a practical subset that covers normal documents and
notes; deeply nested lists are flattened.
"""
import sys
import os
import re
import html
import subprocess
import tempfile
from shutil import which

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
]

CSS = """
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
@page { size: letter; margin: 0.9in 1in; }
* { box-sizing: border-box; }
body {
  font-family: "EB Garamond", Georgia, "Times New Roman", serif;
  color: #1f1a1b; font-size: 11.5pt; line-height: 1.62; margin: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
/* Book title (first H1) reads as a title block */
h1 {
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #5e1a28; font-size: 30pt; font-weight: 700; line-height: 1.12;
  text-align: center; margin: 6px 0 6px 0; padding: 0;
  letter-spacing: 0.01em;
}
/* Part headings */
h2 {
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #7b2332; font-size: 19pt; font-weight: 700;
  border-bottom: 2px solid #c8a977; padding-bottom: 5px;
  margin: 26px 0 12px 0;
}
/* Section headings */
h3 {
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #7b2332; font-size: 15pt; font-weight: 700;
  margin: 18px 0 5px 0;
}
h4, h5, h6 {
  font-family: "Cormorant Garamond", Georgia, serif;
  color: #7b2332; font-size: 12.5pt; font-weight: 600; margin: 13px 0 4px 0;
}
p { margin: 8px 0; }
em { font-style: italic; color: #4a4042; }
strong { font-weight: 700; color: #1a1a1a; }
ul, ol { margin: 8px 0; padding-left: 24px; }
li { margin: 5px 0; }
li.task { list-style: none; margin-left: -16px; }
a { color: #7b2332; text-decoration: none; }
code {
  font-family: Menlo, Consolas, monospace; font-size: 10pt;
  background: #f5f0e8; padding: 1px 4px; border-radius: 3px;
}
pre {
  background: #faf6ee; border-left: 3px solid #c8a977; padding: 9px 12px;
  overflow-x: auto; font-size: 10pt;
}
pre code { background: none; padding: 0; }
blockquote {
  margin: 10px 0; padding: 6px 16px; color: #4a4042;
  border-left: 3px solid #c8a977; font-style: italic;
}
blockquote p { margin: 4px 0; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 10.5pt; }
th, td { border: 1px solid #e0d8c8; padding: 5px 8px; text-align: left; vertical-align: top; }
th { background: #7b2332; color: #fff; font-weight: 600; }
hr { border: none; border-top: 1px solid #e0d8c8; margin: 20px 0; }
h1, h2, h3, h4 { page-break-after: avoid; }
table, pre { page-break-inside: avoid; }
/* Start each major Part on a fresh page */
h2 { page-break-before: always; }
"""


def find_chrome():
    for path in CHROME_CANDIDATES:
        if os.path.exists(path):
            return path
    for name in ("google-chrome", "chromium", "chromium-browser", "brave-browser"):
        found = which(name)
        if found:
            return found
    return None


def inline(text):
    """Apply inline Markdown formatting to a run of text, HTML-escaping safely."""
    codes = []

    def stash(m):
        codes.append(m.group(1))
        return "\x00%d\x00" % (len(codes) - 1)

    text = re.sub(r"`([^`]+)`", stash, text)
    text = html.escape(text, quote=False)
    text = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*\s][^*]*?)\*(?!\*)", r"<em>\1</em>", text)

    def unstash(m):
        return "<code>" + html.escape(codes[int(m.group(1))], quote=False) + "</code>"

    return re.sub(r"\x00(\d+)\x00", unstash, text)


LIST_RE = re.compile(r"^\s*([-*+]|\d+\.)\s+(.*)")
HEADING_RE = re.compile(r"(#{1,6})\s+(.*)")
HR_RE = re.compile(r"(-{3,}|\*{3,}|_{3,})\s*$")


def is_special(line):
    s = line.strip()
    if not s:
        return True
    if HEADING_RE.match(line) or HR_RE.match(line):
        return True
    if s.startswith(">") or s.startswith("```"):
        return True
    if LIST_RE.match(line):
        return True
    return False


def parse_row(line):
    line = line.strip()
    if line.startswith("|"):
        line = line[1:]
    if line.endswith("|"):
        line = line[:-1]
    return [c.strip() for c in line.split("|")]


def convert(md):
    lines = md.replace("\r\n", "\n").split("\n")
    out = []
    i, n = 0, len(lines)
    while i < n:
        line = lines[i]

        if line.strip().startswith("```"):
            i += 1
            code = []
            while i < n and not lines[i].strip().startswith("```"):
                code.append(lines[i])
                i += 1
            i += 1
            out.append("<pre><code>" + html.escape("\n".join(code), quote=False) + "</code></pre>")
            continue

        if not line.strip():
            i += 1
            continue

        m = HEADING_RE.match(line)
        if m:
            lvl = len(m.group(1))
            out.append("<h%d>%s</h%d>" % (lvl, inline(m.group(2).strip()), lvl))
            i += 1
            continue

        if HR_RE.match(line):
            out.append("<hr>")
            i += 1
            continue

        if line.lstrip().startswith(">"):
            buf = []
            while i < n and lines[i].lstrip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            paras, cur = [], []
            for b in buf:
                if b.strip():
                    cur.append(b)
                elif cur:
                    paras.append(cur)
                    cur = []
            if cur:
                paras.append(cur)
            inner = "".join("<p>%s</p>" % inline(" ".join(p)) for p in paras)
            out.append("<blockquote>%s</blockquote>" % inner)
            continue

        if "|" in line and i + 1 < n and "-" in lines[i + 1] \
                and re.match(r"^\s*\|?[\s:\-|]+\|?\s*$", lines[i + 1]):
            header = parse_row(line)
            i += 2
            rows = []
            while i < n and "|" in lines[i] and lines[i].strip():
                rows.append(parse_row(lines[i]))
                i += 1
            thead = "".join("<th>%s</th>" % inline(c) for c in header)
            body = ""
            for r in rows:
                cells = "".join("<td>%s</td>" % inline(c) for c in r)
                body += "<tr>%s</tr>" % cells
            out.append("<table><tr>%s</tr>%s</table>" % (thead, body))
            continue

        if LIST_RE.match(line):
            ordered = bool(re.match(r"^\s*\d+\.", line))
            items = []
            while i < n:
                mm = LIST_RE.match(lines[i])
                if not mm:
                    break
                items.append(mm.group(2))
                i += 1
            tag = "ol" if ordered else "ul"
            lis = []
            for it in items:
                tm = re.match(r"\[([ xX])\]\s+(.*)", it)
                if tm:
                    box = "&#9745;&nbsp;" if tm.group(1).lower() == "x" else "&#9744;&nbsp;"
                    lis.append('<li class="task">%s%s</li>' % (box, inline(tm.group(2))))
                else:
                    lis.append("<li>%s</li>" % inline(it))
            out.append("<%s>%s</%s>" % (tag, "".join(lis), tag))
            continue

        para = []
        while i < n and lines[i].strip() and not is_special(lines[i]):
            para.append(lines[i].strip())
            i += 1
        out.append("<p>%s</p>" % inline(" ".join(para)))

    return "\n".join(out)


def build_page(body, title):
    return (
        "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\">"
        "<title>%s</title><style>%s</style></head><body>\n%s\n</body></html>"
        % (html.escape(title), CSS, body)
    )


def main():
    args = [a for a in sys.argv[1:]]
    title = None
    if "--title" in args:
        idx = args.index("--title")
        title = args[idx + 1]
        del args[idx:idx + 2]
    if len(args) != 2:
        sys.exit("Usage: md2pdf.py INPUT.md OUTPUT.pdf [--title \"Title\"]")
    src, dst = args
    if not os.path.isfile(src):
        sys.exit("Input file not found: " + src)

    chrome = find_chrome()
    if not chrome:
        sys.exit("No Chromium-family browser found. Install Google Chrome.")

    md = open(src, encoding="utf-8").read()
    if not title:
        m = re.search(r"^#\s+(.*)", md, re.M)
        title = m.group(1).strip() if m else os.path.basename(src)

    page = build_page(convert(md), title)
    dst = os.path.abspath(dst)
    os.makedirs(os.path.dirname(dst), exist_ok=True)

    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as tmp:
        tmp.write(page)
        tmp_path = tmp.name
    try:
        result = subprocess.run(
            [chrome, "--headless", "--disable-gpu", "--no-pdf-header-footer",
             "--print-to-pdf=" + dst, tmp_path],
            capture_output=True, text=True,
        )
    finally:
        os.unlink(tmp_path)

    if not os.path.isfile(dst):
        sys.exit("PDF generation failed.\n" + result.stderr)
    print("PDF written: %s (%d KB)" % (dst, os.path.getsize(dst) // 1024))


if __name__ == "__main__":
    main()
