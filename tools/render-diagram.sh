#!/usr/bin/env bash
# render-diagram.sh — render an HTML diagram to a crisp 2x PNG via headless Chrome.
#
# The project authors review diagrams (sitemap, IA, etc.) as standalone HTML in
# worker/public/*.html and ships them to the review group as PNGs. This wraps the
# headless-Chrome invocation so it isn't retyped, and defaults the window TALL so
# content isn't clipped (the common failure: guessing too short and re-rendering).
#
# Usage:
#   tools/render-diagram.sh <input.html> <output.png> [width] [height]
#
# Examples:
#   tools/render-diagram.sh worker/public/sitemap-diagram-clean.html sitemap-diagram-clean.png 720 1240
#   tools/render-diagram.sh worker/public/sitemap-diagram.html sitemap-diagram.png        # uses defaults
#
# Notes:
# - Output is rendered at device-scale 2 (retina-crisp).
# - If the bottom is clipped, bump the height arg; when in doubt, over-size — the
#   sheet is centered on white, so extra height just adds bottom margin.

set -euo pipefail

IN="${1:?usage: render-diagram.sh <input.html> <output.png> [width] [height]}"
OUT="${2:?usage: render-diagram.sh <input.html> <output.png> [width] [height]}"
W="${3:-900}"
H="${4:-1500}"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Chrome not found at: $CHROME" >&2; exit 1; }
[ -f "$IN" ]      || { echo "Input HTML not found: $IN" >&2; exit 1; }

# Resolve to a file:// URL (Chrome needs an absolute path).
ABS_IN="$(cd "$(dirname "$IN")" && pwd)/$(basename "$IN")"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=2 \
  --window-size="${W},${H}" \
  --screenshot="$OUT" \
  "file://${ABS_IN}" 2>/dev/null

echo "Rendered ${OUT} ($(du -h "$OUT" | cut -f1), ${W}x${H} @2x)"
