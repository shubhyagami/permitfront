# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

Permitfront is an open‑source web application that simplifies the management of permit‑application workflows.  
It offers a clear dashboard for tracking permits, role‑based permissions, and safeguards against concurrent edits so reviewers can collaborate smoothly.

---

## Table of Contents

- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation & Running](#installation--running)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Permit Tracking** | An interactive dashboard that visualises the lifecycle of a permit from submission through approval. |
| **Role Management** | Tools for assigning and enforcing reviewer and applicant permissions, ensuring data integrity. |
| **Overlap Prevention** | Detects and blocks conflicting edits, preventing simultaneous modifications on the same permit. |
| **Real‑time Updates** | WebSocket‑based updates keep all stakeholders in sync with the latest changes. |

---

## Quick Start

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install
npm start
```

The application will start on `http://localhost:3000` by default.

---

## Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- Optional: A database instance (MongoDB, PostgreSQL, etc.)

---

## Installation & Running

1. **Clone the repository**  
   ```bash
   git clone https://github.com/shubhyagami/permitfront.git
   cd permitfront
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the server**  
   ```bash
   npm start
   ```

   The app is accessible at `http://localhost:3000` unless overridden by the `PORT` variable.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Port on which the server listens. |
| `DB_URL` | –       | Connection string for the database (MongoDB, PostgreSQL, etc.). |

Create a `.env` file in the project root to set these values, e.g.:

```
PORT=4000
DB_URL=mongodb://localhost:27017/permitfront
```

---

## Testing

Run the full test suite:

```bash
npm test
```

All tests are written with Jest. Coverage reports are generated automatically and can be viewed in the `coverage/` directory.

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Check Issues** – Browse open issues before opening a new one.
2. **Fork & Branch** – Fork the repository and create a branch using the pattern `feature/<name>` or `fix/<description>`.
3. **Keep Updated** – Sync with the upstream master (`git pull --rebase origin master`).
4. **Lint & Test** – Ensure code passes linting (`npm run lint`) and tests (`npm test`).
5. **Pull Request** – Submit a PR with a clear title and description.

All contributions are reviewed for compatibility, test coverage, and style consistency.

---

## Changelog

- **v1.1.0 (August 2026)** – Added signature verification for permit submissions; refined overlap detection.
- **v1.0.1 (July 2026)** – Improved real‑time synchronization for anomaly detection.
- **v1.0.0 (June 2026)** – Initial release with permit tracking and role management.

---

## License

Permitfront is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
