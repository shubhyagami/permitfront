# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

Permitfront is an open‑source web application that streamlines permit‑application workflows.  
It provides a clear dashboard for tracking permits, role‑based permissions, and safeguards against concurrent edits so reviewers can collaborate smoothly.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Getting Started

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the default instance.

---

## Features

| Feature | Description |
|---------|-------------|
| **Permit Tracking** | Interactive dashboard visualising the full lifecycle of a permit from submission to approval. |
| **Role Management** | Assign and enforce reviewer and applicant permissions to maintain data integrity. |
| **Concurrency Control** | Detects and blocks conflicting edits, preventing simultaneous modifications on the same permit. |
| **Real‑time Updates** | WebSocket‑based notifications keep all stakeholders in sync with the latest changes. |

---

## Prerequisites

- **Node.js** ≥ 18 (Recommended LTS)
- **Database** – Supports MongoDB, PostgreSQL, or any driver‑compatible database.

---

## Installation

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install
```

---

## Configuration

Create a `.env` file at the project root to override defaults:

```
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

| Variable | Default | Purpose |
|----------|---------|----------|
| `PORT`   | `3000`  | Port the server listens on. |
| `DB_URL` | –       | Connection string for your database. |

---

## Running the App

```bash
npm start
```

The application starts on `http://localhost:3000` unless the `PORT` variable is set.  
During development, you can use:

```bash
npm run dev
```

to run the server with automatic reloading (if the script is defined).

---

## Testing

All tests are implemented with Jest. Run them with:

```bash
npm test
```

Coverage reports are generated automatically and can be viewed in the `coverage/` directory.

---

## Contributing

We appreciate all contributions! If you’d like to help, please follow these steps:

1. **Check Issues** – Look for open issues before creating a new one.  
2. **Fork & Branch** – Fork the repository, then create a feature branch such as `feature/<name>` or `fix/<description>`.  
3. **Keep Updated** – Rebase against the latest `main` state (`git pull --rebase origin main`).  
4. **Lint & Test** – Run `npm run lint` and `npm test` to ensure code quality.  
5. **Pull Request** – Submit a PR with a clear title and description.  

All contributions are reviewed for compatibility, test coverage, and style consistency.

---

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) for a detailed history of updates.  
**Recent highlights**

- **v1.1.0** – Added signature verification for permit submissions and refined overlap detection.  
- **v1.0.1** – Improved real‑time synchronization for anomaly detection.  
- **v1.0.0** – Initial release with permit tracking and role management.

---

## License

Permitfront is released under the MIT License. See the [LICENSE](LICENSE) file for details.
