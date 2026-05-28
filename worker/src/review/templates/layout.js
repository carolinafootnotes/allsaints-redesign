export function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function layout({ title, body, head = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} · All Saints' Review</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'DM Sans', sans-serif; background: #faf8f4; color: #1a1a1a; line-height: 1.6; padding: 1.5rem; }
.container { max-width: 720px; margin: 0 auto; }
h1, h2, h3 { font-family: 'Cormorant Garamond', serif; color: #1a1a1a; }
h1 { font-size: 2rem; margin-bottom: 0.5rem; }
h2 { font-size: 1.4rem; margin: 2rem 0 0.75rem; color: #7b2332; }
h3 { font-size: 1.15rem; margin-bottom: 0.5rem; }
a { color: #7b2332; }
.decision-card { background: #fff; border: 1px solid #e8e4dc; border-radius: 10px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.decision-question { font-weight: 600; font-size: 1.05rem; margin-bottom: 0.5rem; }
.decision-context { font-size: 0.9rem; color: #666; margin-bottom: 1rem; font-style: italic; }
.option { display: block; background: #faf8f4; border: 2px solid transparent; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; cursor: pointer; transition: border-color 0.15s; }
.option:hover { border-color: rgba(123,35,50,0.3); }
.option.selected { border-color: #7b2332; background: #fff; }
.option-label { font-weight: 700; font-size: 0.85rem; color: #7b2332; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 0.4rem; }
.option-body { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; }
textarea, input[type=text], input[type=email], select { font: inherit; width: 100%; padding: 0.6rem; border: 1px solid #d0cabd; border-radius: 6px; background: #fff; }
textarea { min-height: 80px; resize: vertical; }
button, .btn { font: inherit; background: #7b2332; color: #fff; padding: 0.6rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
button:hover { background: #5e1a28; }
button.secondary { background: #fff; color: #7b2332; border: 1px solid #7b2332; }
.badge { display: inline-block; padding: 0.2rem 0.6rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; border-radius: 4px; }
.badge-open { background: #fff3cd; color: #8a6d3b; }
.badge-submitted { background: #d1ecf1; color: #0c5460; }
.badge-finalized { background: #d4edda; color: #155724; }
.field { margin: 1rem 0; }
.field label { display: block; font-weight: 600; font-size: 0.85rem; margin-bottom: 0.25rem; color: #555; }
.section { margin-bottom: 2.5rem; }
.status-line { font-size: 0.85rem; color: #666; margin-top: 0.5rem; }
</style>
${head}
</head>
<body>
<div class="container">${body}</div>
</body>
</html>`;
}
