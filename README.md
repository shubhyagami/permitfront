# Permitfront

> An open‑source web app that simplifies permit‑application workflows: track permits, manage roles, and keep everyone in sync without conflicts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## Quick start

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install

# create a .env file (see example below)
echo "PORT=4000\nDB_URL=mongodb://localhost:27017/permitfront" > .env

# start development server
npm run dev   # opens http://localhost:4000
```

For a production build run `npm start` after setting the desired environment variables.

---

## Features

- **Permit lifecycle tracking** – View every stage from submission to final approval.
- **Role‑based permissions** – Create and assign reviewers, applicants, and admins.
- **Concurrency protection** – Detect edit conflicts and lock records for safe collaboration.
- **Real‑time updates** – WebSocket notifications keep all stakeholders in sync.

---

## Installation

```bash
npm install
```

> The project uses [Node.js 20+](https://nodejs.org/) and a database that supports a compatible driver (MongoDB, PostgreSQL, etc.).

---

## Configuration

Create a `.env` file in the repository root. Variables are documented in [`.env.example`](.env.example).

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Port on which the server listens. |
| `DB_URL` | –       | Connection string for your database. |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

---

## Running the application

| Mode    | Command          | Description |
|---------|------------------|-------------|
| Production | `npm start`     | Launches the server on the configured port. |
| Development | `npm run dev`  | Starts a hot‑reloading dev server. |

The app is accessible at `http://localhost:<PORT>`.

---

## Development

```bash
npm install            # dev dependencies
npm run lint           # lint the code
npm run format         # auto‑format
npm run test           # run Jest tests
```

Feature branches should be named `feature/<name>` or `fix/<issue>`, rebased regularly (`git pull --rebase origin main`), and include lint and test passes before PR.

---

## Testing

All unit and integration tests are written with Jest. Run them with:

```bash
npm test
```

Coverage reports are generated under `coverage/`.

---

## Contributing

1. Fork, clone, and create a branch: `git checkout -b feature/<name>`.
2. Run `npm run lint && npm test` before committing.
3. Push and open a PR. Provide a clear title, description, and link to any related issue.

All contributions are reviewed for style, test coverage, and backward compatibility.

---

## Changelog

See the full history in [CHANGELOG.md](CHANGELOG.md).

**Highlights**

- **v1.1.0** – Added signature verification for submissions and refined overlap detection.  
- **v1.0.1** – Improved real‑time synchronization for anomaly detection.  
- **v1.0.0** – Initial release with permit tracking and role management.

---

## License

MIT © [Shubhyagami](https://github.com/shubhyagami)
