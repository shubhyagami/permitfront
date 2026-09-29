[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
# Permitfront

A lightweight, open-source web application for managing permit-application workflows. It handles permits end to end, enforces role-based access control, keeps an immutable audit trail, and pushes live updates over WebSockets.

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)
![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Overview

Permitfront covers the full permit lifecycle, from initial submission through to final approval. It is designed for teams that need a small, hackable core rather than a heavyweight platform:

- **Immutable audit trail** — every status change is recorded with a timestamp and the actor who made it.
- **Role-based access control** — separate permission sets for applicants, reviewers, and admins.
- **Optimistic concurrency** — edit conflicts are detected when two users update the same record.
- **Live updates** — WebSocket notifications keep every connected client in sync.
- **Pluggable storage** — swap database drivers without touching the core logic.

Supported databases: MongoDB, PostgreSQL, MySQL, and SQLite, plus any driver that implements the provided interface.

---

## Features

| Feature | Description |
|---------|-------------|
| Lifecycle tracking | Visual timeline of every status change |
| Role-based ACL | Fine-grained permissions for applicants, reviewers, and admins |
| Optimistic locking | Prevents concurrent update conflicts |
| Live updates | WebSocket notifications for connected clients |
| Audit trail | Immutable record of all actions |
| Optional notifications | Email or SMS notifications for key events |
| Modular design | Plug in new database drivers or UI frameworks |

---

## Architecture

```
┌─────────────────────┐      ┌───────────────────────┐
│ Frontend (React)    │<────►│ WebSocket Server (WS) │
└─────────────────────┘      └───────────────────────┘
          ▲                        │
          │                        ▼
┌───────────────────────┐   ┌─────────────────────┐
│ API Gateway (Express) │◄──│ Database Driver (ORM)│
└───────────────────────┘   └─────────────────────┘
          │
          ▼
┌───────────────────────┐
│ Permits & Users Tables│
└───────────────────────┘
```

The core logic lives in the API layer. The database layer is abstracted behind a driver interface, so any supported database can be swapped by updating the configuration.

---

## Prerequisites

- Node.js 20 or newer
- One of the supported databases:
  - MongoDB
  - PostgreSQL
  - MySQL
  - SQLite

---

## Getting started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Copy the example environment file and adjust it to your setup
cp .env.example .env
#   edit .env to set PORT, DB_URL, JWT_SECRET, etc.

# Start the development server
npm run dev
```

The server listens on the port specified by `PORT` (default `3000`). Once running, the HTTP API is available at `http://localhost:${PORT}` and the WebSocket endpoint at `ws://localhost:${PORT}/ws`.

---

## Configuration

Create a `.env` file in the project root. Example:

```dotenv
PORT=3000
DB_URL=mongodb://localhost:27017/permitfront
JWT_SECRET=very-secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server listening port |
| `DB_URL` | – | Database connection string |
| `JWT_SECRET` | – | Secret used to sign JWTs |
| `TWILIO_SID` | – | Twilio Account SID for SMS notifications |
| `TWILIO_AUTH_TOKEN` | – | Twilio Auth Token for SMS notifications |

See `.env.example` for optional settings and defaults.

---

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Starts a hot-reloading development server |
| `npm run build` | Bundles front-end assets for production |
| `npm start` | Runs the production server |
| `npm run lint` | Runs ESLint |
| `npm run format` | Formats code with Prettier |
| `npm test` | Runs Jest tests and generates coverage |

---

## Testing

```bash
npm test
```

Tests are written with Jest. Coverage reports are written to `coverage/`, and the header badge reflects the latest upload to Codecov.

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/<name>
   ```
2. Run linting and tests before committing:
   ```bash
   npm run lint && npm test
   ```
3. Open a pull request with a clear title, a short description, and a link to the relevant issue if there is one.

Please follow the existing code style and add tests for new functionality.

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the full history.

**Recent highlights**

- **v1.1.0** — Added signature verification for submissions and improved overlap detection.
- **v1.0.1** — Enhanced real-time synchronization for anomaly detection.
- **v1.0.0** — Initial release with permit tracking and role management.

---

## License

MIT © [Shubhyagami](https://github.com/shubhyagami)
