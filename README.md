# Permitfront

*A lightweight, open‑source web application that simplifies permit‑application workflows. It tracks permits, manages roles, and keeps stakeholders in sync with real‑time notifications.*

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Permitfront handles the full permit lifecycle—from submission to final approval—while providing:

- An immutable audit trail
- WebSocket‑based live updates
- Optimistic concurrency control
- Role‑based access control for applicants, reviewers, and admins
- A modular architecture that makes it easy to swap database drivers or UI frameworks

---

## Quick Start

```bash
# 1️⃣ Clone the repo
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# 2️⃣ Install dependencies
npm install

# 3️⃣ Configure the environment
cp .env.example .env
# edit .env as needed

# 4️⃣ Run in development mode
npm run dev   # http://localhost:4000

# 5️⃣ Build & run for production
npm run build
npm start    # http://localhost:4000
```

---

## Features

- **Full lifecycle tracking** – visual timeline of every status change
- **Role‑based ACL** – fine‑grained permissions for applicants, reviewers, and admins
- **Optimistic locking** – prevents concurrent edit conflicts
- **Live updates** – WebSocket notifications keep all users in sync
- **Extensible architecture** – plug in new database drivers or UI frameworks with minimal effort

---

## Prerequisites

- **Node.js** ≥ 20
- A supported database (MongoDB, PostgreSQL, etc.)

---

## Installation

### Development

```bash
npm install
cp .env.example .env
# Edit .env
npm run dev   # Hot‑reloading server
```

### Production

```bash
npm run build   # Bundle front‑end assets
npm start       # Starts the server
```

The server listens on the port specified by `PORT` (default `3000`).

---

## Configuration

Create a `.env` file in the project root with the following variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Server listening port |
| `DB_URL` | –       | Database connection string |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

See `.env.example` for optional settings.

---

## Available Scripts

| Script          | Purpose                                |
|-----------------|----------------------------------------|
| `npm run dev`   | Hot‑reloading development server       |
| `npm run build` | Bundle front‑end assets                |
| `npm start`     | Production server                      |
| `npm run lint`  | Run ESLint                             |
| `npm run format`| Run Prettier                           |
| `npm test`      | Run Jest tests                         |

---

## Testing

All tests use Jest. Run:

```bash
npm test
```

Coverage reports are written to `coverage/` and can also be viewed on Codecov.

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feature/<name>`.
2. Run `npm run lint && npm test` to ensure style and tests pass.
3. Submit a pull request with a clear title, description, and linked issue (if any).
4. Contributions are evaluated on style, test coverage, and compatibility.

Follow the existing coding conventions.

---

## Changelog

See the full history in [CHANGELOG.md](CHANGELOG.md).

**Highlights**

- **v1.1.0** – Added signature verification for submissions and improved overlap detection.  
- **v1.0.1** – Enhanced real‑time synchronization for anomaly detection.  
- **v1.0.0** – Initial release with permit tracking and role management.

---

## License

MIT © [Shubhyagami](https://github.com/shubhyagami)
