# Permitfront

> A lightweight open‑source web application for managing permit‑application workflows. It tracks permits, manages roles, and keeps all stakeholders in sync with real‑time notifications.

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
  - [Development](#development)
  - [Production](#production)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Permitfront is a full‑stack solution designed to handle the entire permit lifecycle—from submission to final approval. Key capabilities include:

- A complete audit trail
- Real‑time notifications via WebSocket
- Conflict protection with optimistic locking
- Role‑based access control (applicants, reviewers, admins)

The application is intentionally lightweight, making it easy to customize the database driver or UI framework.

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Copy and edit environment variables
cp .env.example .env
#   (edit PORT, DB_URL, etc.)

# Run in development mode
npm run dev
#   → http://localhost:4000
```

For a production build:

```bash
npm run build   # Builds front‑end assets
npm start       # Starts the server
```

---

## Features

- **Full lifecycle tracking** – visualises every status change on a permit timeline.
- **Role‑based access control** – fine‑grained permissions for different user types.
- **Optimistic concurrency** – prevents conflicting edits.
- **Live updates** – WebSocket notifications keep all users in sync.
- **Extensible** – swap database drivers or UI frameworks with minimal effort.

---

## Prerequisites

- **Node.js** ≥ 20
- Supported database (MongoDB, PostgreSQL, etc.)

---

## Installation

### Development

```bash
npm install
cp .env.example .env
# Edit .env as needed
npm run dev
```

### Production

```bash
npm run build   # Bundles front‑end assets
npm start       # Runs the server
```

The server listens on the port defined by `PORT` (default `3000`).

---

## Configuration

Create a `.env` file in the project root:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Server port |
| `DB_URL` | –       | Database connection string |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

For the full list of optional settings, see `.env.example`.

---

## Available Scripts

| Script        | Purpose |
|--------------|---------|
| `npm run dev` | Hot‑reloading development server |
| `npm start`   | Production server |
| `npm run build` | Bundle front‑end assets |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm test`    | Run Jest tests |

---

## Testing

All tests use Jest. Run:

```bash
npm test
```

Coverage reports are generated in the `coverage/` directory and on Codecov.

---

## Contributing

1. Fork the repository.
2. Create a feature or bug‑fix branch (`git checkout -b feature/<name>`).
3. Ensure code quality: `npm run lint && npm test`.
4. Submit a pull request with a clear title, description, and any related issue link.
5. Contributions are evaluated on style, test coverage, and backward compatibility.

Follow the repository’s coding conventions.

---

## Changelog

Full history: [CHANGELOG.md](CHANGELOG.md)

**Highlights**

- **v1.1.0** – Added signature verification for submissions and improved overlap detection.
- **v1.0.1** – Enhanced real‑time synchronization for anomaly detection.
- **v1.0.0** – Initial release with permit tracking and role management.

---

## License

MIT © [Shubhyagami](https://github.com/shubhyagami)
