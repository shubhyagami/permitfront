# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

Permitfront is an open‑source web application that streamlines permit‑application workflows.  
It offers an intuitive dashboard for tracking permits, role‑based permission management, and safeguards against concurrent edits so reviewers can collaborate seamlessly.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Development](#development)
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

Open your browser to `http://localhost:3000` to view the default instance.

---

## Quick Start

```bash
# Create a .env file
echo "PORT=4000
DB_URL=mongodb://localhost:27017/permitfront" > .env

# Run the application
npm run dev
```

The development server starts on `http://localhost:4000`.

---

## Features

- **Permit Tracking** – Interactive dashboard visualising the full lifecycle of a permit from submission to approval.  
- **Role Management** – Create and enforce reviewer and applicant permissions.  
- **Concurrency Control** – Detects and blocks conflicting edits, preventing simultaneous modifications on the same permit.  
- **Real‑time Updates** – WebSocket‑based notifications keep all stakeholders in sync.  

---

## Prerequisites

- **Node.js** ≥ 18 (recommended LTS)
- **Database** – MongoDB, PostgreSQL, or any driver‑compatible database.

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
|---------|---------|---------|
| `PORT`   | `3000`  | Port the server listens on. |
| `DB_URL` | –       | Connection string for your database. |

---

## Running the App

```bash
# Production
npm start

# Development (auto‑reload)
npm run dev
```

The server starts on `http://localhost:<PORT>` (default `3000`).

---

## Development

```bash
# Install TypeScript and lint dependencies
npm install

# Lint the code
npm run lint

# Format the code
npm run format
```

---

## Testing

All tests are written with Jest.

```bash
npm test
```

Coverage reports are generated in the `coverage/` directory.

---

## Contributing

We welcome contributions! Here’s how to get started:

1. **Check the issue tracker** – see if your idea has already been discussed.  
2. **Fork & Branch** – create a feature or fix branch (`feature/<name>` or `fix/<description>`).  
3. **Rebase** – keep your branch up to date with `main`:  
   ```bash
   git pull --rebase origin main
   ```  
4. **Lint & Test** – run `npm run lint` and `npm test` before committing.  
5. **Pull Request** – submit a PR with a clear title and description.  

All contributions are reviewed for compatibility, test coverage, and style consistency.

---

## Changelog

See the [CHANGELOG.md](CHANGELOG.md) for a full history.

**Recent highlights**

- **v1.1.0** – Added signature verification for permit submissions and refined overlap detection.  
- **v1.0.1** – Improved real‑time synchronization for anomaly detection.  
- **v1.0.0** – Initial release with permit tracking and role management.

---

## License

Permitfront is released under the MIT License. See the [LICENSE](LICENSE) file for details.
