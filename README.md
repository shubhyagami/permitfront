# Permitfront

> A lightweight, open‑source web application that simplifies permit‑application workflows. It tracks permits, manages roles, and delivers real‑time notifications to keep stakeholders in sync.

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## 📚 Overview

Permitfront handles the full permit lifecycle—from initial submission to final approval—while providing:

- **Immutable audit trail**: every status change is logged with a timestamp and actor.
- **Role‑based access control**: distinct permission sets for applicants, reviewers, and admins.
- **Optimistic concurrency**: prevents edit conflicts when multiple users update the same record.
- **WebSocket updates**: live notifications keep all users in sync.
- **Extensible architecture**: swap database drivers or UI frameworks without touching core logic.

It supports **MongoDB, PostgreSQL, MySQL, and SQLite** (and any driver that implements the provided interface).

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Full lifecycle tracking** | Visual timeline of every status change. |
| **Role‑based ACL** | Fine‑grained permissions for applicants, reviewers, and admins. |
| **Optimistic locking** | Prevents concurrent update conflicts. |
| **Live updates** | WebSocket notifications keep all clients synchronized. |
| **Modular** | Plug in new database drivers or UI frameworks with minimal effort. |
| **Audit trail** | Immutable record of all actions. |
| **Toggleable notifications** | Email or push notifications for key events. |

---

## 🏗️ Architecture

```
┌──────────────────┐        ┌───────────────────────┐
│ Frontend (React) │<------►│ WebSocket Server (WS) │
└──────────────────┘        └───────────────────────┘
          ▲                            │
          │                            ▼
┌───────────────────────┐    ┌─────────────────────┐
│ API Gateway (Express) │<---│ Database Driver (ORM)│
└───────────────────────┘    └─────────────────────┘
          │
          ▼
┌───────────────────────┐
│  Permits & Users Tables│
└───────────────────────┘
```

The core logic lives in the API layer. The database layer is abstracted so that any supported driver can be swapped by changing a configuration file.

---

## ⚙️ Prerequisites

- **Node.js** ≥ 20
- A supported database:
  - **MongoDB**
  - **PostgreSQL**
  - **MySQL**
  - **SQLite**

---

## 🚀 Getting Started

```bash
# 1️⃣ Clone the repository
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create environment file
cp .env.example .env
# Edit .env to match your database URL, port, etc.

# 4️⃣ Run in development mode
npm run dev   # http://localhost:4000

# 5️⃣ Build & run for production
npm run build
npm start    # http://localhost:4000
```

> The server listens on the port defined by `PORT` (default `3000`).  
> A hot‑reloading development server is started with `npm run dev`.  
> For production, first build the front‑end assets with `npm run build`, then start the server with `npm start`.

---

## 📦 Installation

### Development

```bash
npm install
cp .env.example .env
# Edit the .env file
npm run dev
```

### Production

```bash
npm run build   # Bundle front‑end assets
npm start       # Starts the server on the configured port
```

---

## ⚙️ Configuration

Create a `.env` file at the project root. Example:

```dotenv
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

| Variable  | Default | Description |
|-----------|---------|-------------|
| `PORT`    | `3000`  | Port the server listens on. |
| `DB_URL`  | –       | Database connection string. |
| `JWT_SECRET` | – | Secret key used for JWT authentication. |
| `TWILIO_SID` | – | Twilio Account SID for SMS notifications. |
| `TWILIO_AUTH_TOKEN` | – | Twilio Auth Token. |

See `.env.example` for optional settings and their defaults.

---

## 🧩 Available Scripts

| Script          | Purpose |
|-----------------|---------|
| `npm run dev`       | Starts a hot‑reloading development server. |
| `npm run build`      | Bundles front‑end assets for production. |
| `npm start`         | Starts the production server. |
| `npm run lint`      | Runs ESLint to check code style. |
| `npm run format`    | Formats code with Prettier. |
| `npm test`          | Runs Jest tests and generates coverage. |

---

## 🧪 Testing

All tests are written with Jest. Run:

```bash
npm test
```

Coverage reports are written to `coverage/`. A public Codecov badge is included in the header.

---

## 🤝 Contributing

1. Fork the repository and create a feature branch:  
   ```bash
   git checkout -b feature/<name>
   ```
2. Ensure linting and tests pass:  
   ```bash
   npm run lint && npm test
   ```
3. Submit a pull request with a clear title, description, and linked issue (if applicable).  

Please follow the existing code style and include tests for new functionality.

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
