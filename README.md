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

Permitfront covers the entire permit lifecycle, from submission to final approval. Key capabilities include:

- Complete audit trail
- WebSocket‑based live updates
- Optimistic concurrency to avoid edit conflicts
- Role‑based access control for applicants, reviewers, and admins
- Extensible architecture that lets you swap database drivers or UI frameworks with minimal effort

---

## Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env   # edit the file as needed

# 4. Run in development mode
npm run dev   # http://localhost:4000

# 5. Build & run for production
npm run build
npm start     # http://localhost:4000
```

---

## Features

| Feature | Description |
|---------|-------------|
| Full‑life‑cycle tracking | Visual timeline of every status change |
| Role‑based ACL | Fine‑grained permissions for different user types |
| Optimistic locking | Prevents concurrent edit conflicts |
| Live updates | WebSocket notifications keep all users in sync |
| Extensible | Plug in new database drivers or UI frameworks easily |

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

Create a `.env` file in the project root:

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

| Script          | Purpose |
|-----------------|--------|
| `npm run dev`   | Hot‑reloading development server |
| `npm run build` | Bundle front‑end assets |
| `npm start`     | Production server |
| `npm run lint`  | Run ESLint |
| `npm run format`| Run Prettier |
| `npm test`      | Run Jest tests |

---

## Testing

All tests use Jest. Run:

```bash
npm test
```

Coverage reports are written to `coverage/` and can also be viewed on Codecov.

---

## Contributing

1. Fork the repo.  
2. Create a feature or bug‑fix branch: `git checkout -b feature/<name>`.  
3. Run `npm run lint && npm test`.  
4. Submit a pull request with a clear title, description, and linked issue.  
5. Contributions are evaluated on style, test coverage, and compatibility.

Follow the coding conventions used throughout the codebase.

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
