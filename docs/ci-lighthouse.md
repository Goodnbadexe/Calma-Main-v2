# Lighthouse Budgets CI

- Budgets file: `lighthouse-budgets.json`
- Run locally: `npx lighthouse http://localhost:5174 --budgets-path=./lighthouse-budgets.json --view`
- CI idea: add a GitHub Action to run Lighthouse on preview deploys and fail on budget regressions.
