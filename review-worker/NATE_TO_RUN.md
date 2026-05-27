# Cloudflare commands for Nate to run

Run these from `review-worker/` in order. Claude can't run them because they require your Cloudflare auth and modify shared infrastructure.

## 1. Create the D1 database

```bash
cd review-worker
npx wrangler d1 create allsaints-review-db
```

Copy the returned `database_id` and paste it into `wrangler.toml` replacing the string `REPLACE_AFTER_CREATE`.

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

## 5. Deploy the worker

```bash
npx wrangler deploy
```

Expected URL: `https://allsaints-review.nate-ernst7.workers.dev`

## 6. Smoke test

```bash
curl https://allsaints-review.nate-ernst7.workers.dev/
```

Should return: `All Saints Review — alive`

## 7. Smoke test the pull script

After the worker is deployed and seeded, finalize the seed bio decision via D1 (or via /admin once you've set the admin key):

```bash
cd review-worker
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
