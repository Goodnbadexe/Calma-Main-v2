## Scope & Assumptions
- Remotes: `origin` is your fork; `upstream` is the main repo.
- Base branch: `main` (fallback to `master` if detected).
- We will wait until the first four tasks are completed before merging (you said we are the 5th).
- Use a guarded staging branch and a PR to update `main` to avoid direct pushes.

## Timing & Coordination
- Hold action until the 4 prerequisite tasks land on `upstream/main`.
- Poll for completion by checking `upstream/main` vs `origin/main` and PR statuses.
- Proceed only when `upstream/main` contains the four tasks (no pending CI failures).

## Prepare Remotes
- Verify remotes: `git remote -v`.
- Add upstream if missing: `git remote add upstream <repo-url>`.
- Fetch all: `git fetch --all --prune`.

## Create Staging Branch
- Checkout base: `git checkout main` (or `master` if present).
- Fast-forward from upstream: `git merge --ff-only upstream/main`.
- Create staging: `git switch -c sync/pr-<ID>-<date>`.

## Pull the PR Safely
- Fetch PR ref without GitHub CLI: `git fetch upstream pull/<ID>/head:pr-<ID>`.
- Merge into staging: `git merge --no-ff pr-<ID>`.
- If conflicts: resolve, `git add .`, `git commit`.

## Keep Local Work Updated
- Rebase any active feature branches onto updated `main` after staging is merged: `git rebase main`.
- If rebase conflicts, resolve and continue: `git rebase --continue`.

## Verification Before Pushing
- Install deps: `npm ci`.
- Lint: `npm run lint` (if available).
- Types: `npm run typecheck` (if available).
- Tests: `npm test` (if available).
- Build: `npm run build` (must pass).
- Smoke run locally to confirm UI and critical flows.

## Publish via PR (No Direct Push)
- Push staging: `git push origin sync/pr-<ID>-<date>`.
- Open a PR from staging to `main` with summary of changes.
- Require CI green and review before merge; use `--ff-only` merge strategy to keep history clean.

## Monitor & Backfill
- After merge, compare branches: `git rev-list --left-right --count upstream/main...origin/main`.
- If upstream gained new commits during review, fast-forward `main` again and re-run verification.
- Periodically `git fetch upstream` and pull anything missing; repeat checks.

## Conflict Handling Policy
- Prefer `merge --no-ff` into staging for clear conflict resolution.
- On `main`, prefer fast-forward only (`--ff-only`) via PR to avoid merge bubbles.
- For recurring conflicts, coordinate file ownership or add codeowners to reduce collisions.

## Deliverables
- Updated local `main`, conflict-free.
- A PR from `sync/pr-<ID>-<date>` to `main` with CI passing.
- Post-merge verification and fast-forward of `origin/main`.
- Monitoring report confirming no drift between `upstream/main` and `origin/main`.

## Next Step
- Confirm PR ID and the upstream repo URL; once you confirm, I’ll execute the plan and carry it through end-to-end.