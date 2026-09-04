# Permitfront

> An open‑source web application that streamlines permit‑application workflows: track permits, manage roles, and keep everyone in sync without conflicts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## Overview

Permitfront helps teams track the lifecycle of permits from submission to final approval.  
Key capabilities:

- **Permit lifecycle tracking** – see every step of a permit’s journey.  
- **Role‑based access** – define applicants, reviewers, and admins.  
- **Concurrency protection** – lock records and detect edit conflicts.  
- **Real‑time updates** – WebSocket notifications keep all stakeholders in sync.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Create a .env file (see .env.example)
cp .env.example .env
# modify PORT and DB_URL as needed

# Run a development server
npm run dev   # opens http://localhost:4000
```

For a production build:

```bash
# Build assets (if applicable)
npm run build

# Start the server
npm start
```

---

## Prerequisites

- **Node.js** ≥ 20
- A database with a compatible driver (e.g. MongoDB, PostgreSQL)

---

## Configuration

Create a `.env` file in the project root. See `.env.example` for all supported variables.

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`    | `3000`  | Port on which the server listens. |
| `DB_URL`  | –       | Connection string for your database. |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

---

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start a hot‑reloading development server. |
| `npm start`   | Launch the server in production mode. |
| `npm run build` | Build any front‑end assets (if applicable). |
| `npm run lint` | Lint the codebase with ESLint. |
| `npm run format` | Auto‑format code with Prettier. |
| `npm test` | Run unit and integration tests with Jest. |

---

## Testing

All tests are written with Jest. Run them with:

```bash
npm test
```

Coverage reports are available under `coverage/`.

---

## Contributing

1. Fork the repository.
2. Create a feature or bug‑fix branch: `git checkout -b feature/<name>` or `git checkout -b fix/<issue>`.
3. Make sure `npm run lint && npm test` pass.
4. Push the branch and open a pull request.
5. Provide a descriptive title, clear description, and link to any related issue.

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
