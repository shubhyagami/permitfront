# Permitfront

> A lightweight, open‑source web application that simplifies permit‑application workflows by tracking permits, managing roles, and keeping all stakeholders in sync without conflicts.

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)  
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)  
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Installation](#installation)
  - [Development](#development)
  - [Production](#production)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Permitfront is a full‑stack solution that helps teams manage the entire lifecycle of a permit, from submission to final approval.  
It provides a clear audit trail, real‑time notifications, and safeguards against concurrent edits.

---

## Key Features

- **Complete lifecycle tracking** – visualize every step against a permit’s timeline.
- **Role‑based access control** – define applicants, reviewers, and admins with fine‑grained permissions.
- **Optimistic locking** – prevent conflicting edits by locking records and signalling conflicts.
- **WebSocket‑based notifications** – live updates keep all users synchronized.
- **Extensible architecture** – swap out the database driver or UI framework with minimal effort.

---

## Installation

### Quick start (development)

```bash
# Clone the repo
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Create a .env file
cp .env.example .env
# Edit PORT and DB_URL as needed

# Run the dev server
npm run dev
# → http://localhost:4000
```

### Production

```bash
# Build front‑end assets (if the project uses a bundler)
npm run build

# Start the server
npm start
```

The server will listen on the port defined in `PORT` (default `3000`).

---

## Prerequisites

- **Node.js** ≥ 20
- A database supported by the chosen driver (MongoDB, PostgreSQL, etc.)

---

## Configuration

Create a `.env` file in the root directory. Refer to `.env.example` for all supported variables.

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Port the server binds to. |
| `DB_URL` | –       | Connection string for your database. |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

---

## Available Scripts

| Script             | Purpose |
|--------------------|---------|
| `npm run dev`      | Start a hot‑reloading development server. |
| `npm start`        | Run the application in production mode. |
| `npm run build`     | Bundle front‑end assets. |
| `npm run lint`      | Run ESLint on the codebase. |
| `npm run format`    | Format code with Prettier. |
| `npm test`          | Execute Jest tests and generate coverage. |

---

## Testing

All tests use Jest. Run them with:

```bash
npm test
```

Coverage reports are stored in `coverage/` and also appear on Codecov.

---

## Contributing

1. Fork the repo.  
2. Create a feature or bug‑fix branch (`git checkout -b feature/<name>` or `git checkout -b fix/<issue>`).  
3. Ensure the code passes linting and tests (`npm run lint && npm test`).  
4. Submit a pull request with a meaningful title, a clear description, and a link to any related issue.  
5. Await review; contributions are assessed for style, test coverage, and backward compatibility.

Please adhere to the coding style defined in the repository and keep changes focused to avoid breaking existing functionality.

---

## Changelog

See the full history in [CHANGELOG.md](CHANGELOG.md).

### Highlights

- **v1.1.0** – added signature verification for submissions and improved overlap detection.  
- **v1.0.1** – enhanced real‑time synchronization for anomaly detection.  
- **v1.0.0** – initial release with permit tracking and role management.

---

## License

MIT © [Shubhyagami](https://github.com/shubhyagami)
