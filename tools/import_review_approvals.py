#!/usr/bin/env python3
"""Pull finalized decisions from D1 review database and apply to /final HTML."""

import argparse
import json
import pathlib
import subprocess
import sys
from typing import Any

REPO = pathlib.Path(__file__).resolve().parent.parent
LEDGER = REPO / "tools" / ".imported_decision_ids"
WORKER_DIR = REPO / "worker"
DB_NAME = "allsaints-review-db"


def load_ledger() -> set[int]:
    if not LEDGER.exists():
        return set()
    return {int(line.strip()) for line in LEDGER.read_text().splitlines() if line.strip()}


def append_ledger(ids: set[int]) -> None:
    with LEDGER.open("a") as f:
        for i in sorted(ids):
            f.write(f"{i}\n")


def d1_query(sql: str) -> list[dict[str, Any]]:
    result = subprocess.run(
        ["npx", "wrangler", "d1", "execute", DB_NAME, "--remote", "--json", "--command", sql],
        cwd=WORKER_DIR,
        capture_output=True,
        text=True,
        check=True,
    )
    payload = json.loads(result.stdout)
    return payload[0]["results"] if payload and "results" in payload[0] else []


def fetch_finalized_decisions(skip_ids: set[int]) -> list[dict[str, Any]]:
    rows = d1_query("SELECT * FROM decisions WHERE status='finalized' ORDER BY id")
    return [r for r in rows if r["id"] not in skip_ids]


def apply_decision(decision: dict[str, Any], dry_run: bool) -> tuple[bool, str]:
    target = json.loads(decision["target_selector"])
    file_path = REPO / target["file"]
    anchor = target["anchor_string"]
    options = json.loads(decision["options"])

    if decision["final_choice"] == "other":
        replacement = decision["final_other_text"] or ""
    else:
        opt = next((o for o in options if o["key"] == decision["final_choice"]), None)
        if not opt:
            return False, f"final_choice {decision['final_choice']} not in options"
        replacement = opt["body"]

    if not file_path.exists():
        return False, f"file not found: {file_path}"

    src = file_path.read_text()
    occurrences = src.count(anchor)
    if occurrences == 0:
        return False, f"anchor not found in {target['file']}: {anchor[:60]!r}"
    if occurrences > 1:
        return False, f"anchor matches {occurrences} times in {target['file']}; not unique"

    new_src = src.replace(anchor, replacement, 1)

    if dry_run:
        print(f"--- Decision {decision['id']}: {decision['question'][:60]}")
        print(f"  file:        {target['file']}")
        print(f"  anchor:      {anchor[:80]!r}")
        print(f"  replacement: {replacement[:80]!r}")
        return True, "dry-run"

    file_path.write_text(new_src)
    return True, "applied"


def maybe_deploy() -> None:
    print("Deploying worker...")
    subprocess.run(["npx", "wrangler", "deploy"], cwd=REPO / "worker", check=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--ids", type=str, help="Comma-separated decision IDs to apply")
    ap.add_argument("--deploy", action="store_true", help="Run wrangler deploy after applying")
    args = ap.parse_args()

    ledger = load_ledger()
    decisions = fetch_finalized_decisions(skip_ids=set() if args.dry_run else ledger)

    if args.ids:
        wanted = {int(x) for x in args.ids.split(",")}
        decisions = [d for d in decisions if d["id"] in wanted]

    if not decisions:
        print("No new finalized decisions to apply.")
        return 0

    print(f"Processing {len(decisions)} decision(s)...")
    applied_ids: set[int] = set()
    failures: list[tuple[int, str]] = []

    for d in decisions:
        ok, msg = apply_decision(d, dry_run=args.dry_run)
        status = "OK" if ok else "SKIP"
        print(f"  [{status}] #{d['id']} {d['question'][:60]}: {msg}")
        if ok and not args.dry_run:
            applied_ids.add(d["id"])
        elif not ok:
            failures.append((d["id"], msg))

    if applied_ids:
        append_ledger(applied_ids)
        print(f"Updated ledger with {len(applied_ids)} id(s).")

    if args.deploy and applied_ids:
        maybe_deploy()

    if failures:
        print(f"\n{len(failures)} failure(s) -- resolve manually:")
        for fid, fmsg in failures:
            print(f"  #{fid}: {fmsg}")
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
