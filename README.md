# JavaScript Playwright Automation Framework

A UI and API test automation framework built with JavaScript and Playwright, using the Page Object Model and custom fixtures. It targets [automationexercise.com](https://automationexercise.com), a public site built for test practice.

## What is included

- **Playwright** test runner with separate `ui-chromium` and `api` projects
- **API layer** (`api/`): a reusable client, service classes, and Ajv JSON schemas
- **Custom fixtures** (`fixtures/`): services plus a self-cleaning test user
- **Test data factory** (`utils/userFactory.js`): unique users, so tests never collide
- **Central config** (`config/env.js`) with dotenv and `.env.example`
- **ESLint and Prettier** for code quality
- **Reporting**: Playwright HTML report, plus screenshots, video and traces on failure
- **Tags** for filtering: `@smoke`, `@regression`, `@negative`

## Design decisions

The demo API has quirks that the API client handles in one place, so tests stay clean:

- The HTTP status is always `200`; the real status is `responseCode` in the JSON body.
- JSON is served as `text/html`, so the body is parsed manually.
- The public host sometimes answers `503` under load, so requests are retried with backoff.

Parallelism is capped at 2 workers because the demo site is shared and free.

## Project structure

```
api/
  clients/    ApiClient (response normalization, retries)
  services/   UserService, ProductService
  schemas/    Ajv JSON schemas
config/       environment settings
fixtures/     custom Playwright fixtures
tests/ui/     UI tests
utils/        user factory, schema validator
```

## Getting started

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

| Command                | Purpose                   |
| ---------------------- | ------------------------- |
| `npm run test:ui`      | Run UI tests              |
| `npm run test:smoke`   | Run tests tagged `@smoke` |
| `npm run report`       | Open the HTML report      |
| `npm run lint`         | Lint the code             |
| `npm run format:check` | Check formatting          |

Please be considerate when running tests: the demo site is free and shared, so keep traffic low.

## Git workflow

`main` is stable, `develop` is the integration branch, and work happens on `feature/*` branches merged through pull requests.

## Roadmap

UI page objects and tests, API tests, and GitHub Actions workflows.

## License

No license has been chosen. All rights reserved.
