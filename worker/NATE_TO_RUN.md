# Cloudflare commands for Nate to run

After the pivot, all review pipeline routes live in the existing `allsaints-redesign` worker (no separate worker). You still need to create a D1 database and add an admin secret. Run these from `worker/` in order. Claude can't run them — they require your Cloudflare auth and modify shared infrastructure.

## 1. Create the D1 database

```bash
cd worker
npx wrangler d1 create allsaints-review-db
```

Then uncomment the `[[d1_databases]]` block in `wrangler.toml` (currently commented out so unrelated content deploys still work) and paste the returned `database_id` in place of `PASTE_AFTER_CREATE`.

## 2. Apply schema to remote D1

```bash
npx wrangler d1 execute allsaints-review-db --remote --file schema/0001_init.sql
```

## 3. Seed test data

```bash
npx wrangler d1 execute allsaints-review-db --remote --file schema/seed.sql
```

## 4. Set the admin key secret

Generate a 32-char random key (one option):

```bash
openssl rand -hex 16
```

Then:

```bash
npx wrangler secret put ADMIN_KEY
```

Paste the generated value when prompted. Save it in your password manager — you'll need it to access `/admin?key=...`.

## 5. Deploy the worker (same one that serves /final)

```bash
npx wrangler deploy
```

This redeploys the existing `allsaints-redesign` worker with the review routes added.

## 6. Smoke test

```bash
curl https://allsaints-redesign.nate-ernst7.workers.dev/r/test-token-abc123
```

Should return an HTML page titled "Welcome, Test Subject" with the seeded bio decision.

```bash
curl -I "https://allsaints-redesign.nate-ernst7.workers.dev/admin?key=YOUR_KEY"
```

Should return 200. Without the key, returns 401.

## 7. Smoke test the pull script

After the worker is deployed and seeded, finalize the seed bio decision via D1 (or via /admin once you've set the admin key):

```bash
cd worker
npx wrangler d1 execute allsaints-review-db --remote --command "UPDATE decisions SET status='finalized', final_choice='B', finalized_at=datetime('now') WHERE id=1"
cd ..
python3 tools/import_review_approvals.py --dry-run
```

Expected: shows the planned replacement. Won't actually find the anchor "Original bio text." in /final, so it'll SKIP with "anchor not found". That's fine, proves the script can query D1 and execute its lookup logic.

To do a real successful test, create a decision in /admin whose target_selector points at an actual string in /final, finalize it, then run:

```bash
python3 tools/import_review_approvals.py --dry-run   # preview the diff
python3 tools/import_review_approvals.py             # apply
python3 tools/import_review_approvals.py --deploy    # apply + deploy /final
```

Reset ledger if you want to re-apply something already imported:

```bash
rm tools/.imported_decision_ids
```
