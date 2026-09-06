# Permitfront

> A lightweight open‑source web application that streamlines permit‑application workflows. It tracks permits, manages roles, and keeps all stakeholders in sync with real‑time notifications.

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)  
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)  
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
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

Permitfront provides a full‑stack solution for managing the entire permit lifecycle—from submission to final approval. It offers:

- A clear audit trail
- Real‑time user notifications
- Conflict protection through optimistic locking

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Create configuration
cp .env.example .env
# Edit the values below
```

Start the development server:

```bash
npm run dev
# → http://localhost:4000 (default)
```

For a production build:

```bash
npm run build
npm start
```

---

## Key Features

- **Complete lifecycle tracking** – view every status change on a permit timeline.
- **Role‑based access control** – granular permissions for applicants, reviewers, and admins.
- **Optimistic concurrency** – prevent conflicting edits with conflict signalling.
- **Live updates** – WebSocket notifications keep all users in sync.
- **Extensible architecture** – swap database drivers or UI frameworks with minimal effort.

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
npm run build   # Builds front‑end assets
npm start       # Runs the server
```

The server listens on the port specified by `PORT` (default `3000`).

---

## Prerequisites

- **Node.js** ≥ 20
- A supported database (MongoDB, PostgreSQL, etc.)

---

## Configuration

Create a `.env` file in the project root:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Port the server binds to. |
| `DB_URL` | –       | Connection string for your database. |

Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

Refer to `.env.example` for the full list of optional settings.

---

## Available Scripts

| Script         | Purpose |
|---------------|---------|
| `npm run dev` | Start a hot‑reloading development server. |
| `npm start`   | Run the application in production mode. |
| `npm run build`| Bundle front‑end assets. |
| `npm run lint` | Run ESLint. |
| `npm run format`| Format with Prettier. |
| `npm test`    | Execute Jest tests and generate coverage. |

---

## Testing

All tests are written with Jest. Run:

```bash
npm test
```

Coverage reports are available in the `coverage/` directory and on Codecov.

---

## Contributing

1. Fork the repo.  
2. Create a feature or bug‑fix branch (`git checkout -b feature/<name>`).  
3. Run `npm run lint && npm test` to ensure code quality.  
4. Submit a pull request with a clear title, description, and any related issue link.  
5. Await review; contributions are evaluated on style, test coverage, and backward compatibility.

Please follow the coding conventions defined in the repository.

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
