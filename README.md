[K[2m  [2mmodel z-ai/glm-5.3-flash failed, trying next...[0m[0m
[K[2m  [2mmodel deepseek-ai/deepseek-v4.1-flash failed, trying next...[0m[0m
# Permitfront

A lightweight, open‑source web application that streamlines permit‑application workflows.  
It manages permits, enforces role‑based access control, keeps an immutable audit trail, and provides real‑time updates via WebSockets.

![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)
![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)
![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)

---

## 📚 Table of contents

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

## 📖 Overview

Permitfront handles the entire permit lifecycle—from initial submission to final approval—while providing:

- **Immutable audit trail** – every status change is logged with a timestamp and actor.
- **Role‑based ACL** – distinct permission sets for applicants, reviewers, and admins.
- **Optimistic concurrency** – prevents edit conflicts when multiple users update the same record.
- **WebSocket updates** – live notifications keep all users in sync.
- **Extensible architecture** – swap database drivers or UI frameworks without touching core logic.

Supported databases: MongoDB, PostgreSQL, MySQL, SQLite (and any driver that implements the provided interface).

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| Full lifecycle tracking | Visual timeline of every status change |
| Role‑based ACL | Fine‑grained permissions for applicants, reviewers, admins |
| Optimistic locking | Prevents concurrent update conflicts |
| Live updates | WebSocket notifications |
| Modular | Plug in new database drivers or UI frameworks |
| Audit trail | Immutable record of all actions |
| Optional notifications | Email or push notifications for key events |

---

## 🏗️ Architecture

```
┌─────────────────────┐      ┌───────────────────────┐
│ Frontend (React)     │<───►│ WebSocket Server (WS)   │
└─────────────────────┘      └───────────────────────┘
          ▲                        │
          │                        ▼
┌───────────────────────┐   ┌─────────────────────┐
│ API Gateway (Express) │◄───│ Database Driver (ORM)│
└───────────────────────┘   └─────────────────────┘
          │
          ▼
┌───────────────────────┐
│ Permits & Users Tables│
└───────────────────────┘
```

The core logic lives in the API layer. The database layer is abstracted so any supported driver can be swapped by updating the configuration.

---

## ⚙️ Prerequisites

- Node.js ≥ 20
- One of the supported databases:
  - MongoDB
  - PostgreSQL
  - MySQL
  - SQLite

---

## 🚀 Getting started

```bash
# Clone the repository
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# Install dependencies
npm install

# Copy the example environment file and adjust to your setup
cp .env.example .env
#   EDIT .env to set PORT, DB_URL, JWT_SECRET, etc.

# Start the development server
npm run dev    # http://localhost:4000
```

The server listens on the port specified by `PORT` (default `3000`). Once running, the API can be accessed at `http://localhost:${PORT}` and the WebSocket server at `ws://localhost:${PORT}/ws`.

---

## 🔧 Configuration

Create a `.env` file at the project root. Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
JWT_SECRET=very-secret
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server listening port |
| `DB_URL` | – | Database connection string |
| `JWT_SECRET` | – | Secret key for JWT authentication |
| `TWILIO_SID` | – | Twilio Account SID for SMS notifications |
| `TWILIO_AUTH_TOKEN` | – | Twilio Auth Token |

See `.env.example` for optional settings and defaults.

---

## 📦 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Starts a hot‑reloading development server |
| `npm run build` | Bundles front‑end assets for production |
| `npm start` | Runs the production server |
| `npm run lint` | Runs ESLint |
| `npm run format` | Formats code with Prettier |
| `npm test` | Runs Jest tests and generates coverage |

---

## 🧪 Testing

```bash
npm test
```

Tests are written with Jest. Coverage reports are written to `coverage/`. A public Codecov badge is included in the header.

---

## 🤝 Contributing

1. Fork the repo and create a feature branch:  
   ```bash
   git checkout -b feature/<name>
   ```
2. Run linting and tests:  
   ```bash
   npm run lint && npm test
   ```
3. Submit a pull request with a clear title, description, and linked issue (if relevant).  

Please follow the existing code style and add tests for new functionality.

---

## 📜 Changelog

See the full history in [CHANGELOG.md](CHANGELOG.md).

**Highlights**

- **v1.1.0** – Added signature verification for submissions and improved overlap detection.  
- **v1.0.1** – Enhanced real‑time synchronization for anomaly detection.  
- **v1.0.0** – Initial release with permit tracking and role management.

---

## 📄 License

MIT © [Shubhyagami](https://github.com/shubhyagami)
