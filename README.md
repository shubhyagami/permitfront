# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)  
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)  
[![Coverage](https://img.shields.io/codecov/c/github/shubhyagami/permitfront?logo=codecov)](https://codecov.io/gh/shubhyagami/permitfront)

Permitfront is an open‑source web application that streamlines permit‑application workflows.  
It provides an intuitive dashboard for tracking permits, role‑based permission management, and safeguards against concurrent edits so reviewers can collaborate without conflicts.

---

## Features

- **Permit Tracking** – Visualise the full lifecycle of a permit from submission to approval.  
- **Role Management** – Define and enforce permissions for reviewers and applicants.  
- **Concurrency Control** – Detect and block conflicting edits on the same permit.  
- **Real‑time Updates** – WebSocket‑based notifications keep all stakeholders in sync.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

---

## Getting Started

git clone https://github.com/shubhyagami/permitfront.git

cd permitfront

npm install

Edit the default configuration in `.env.example` (see below), then start the application:

npm start   # production

Open `http://localhost:3000` (or the port you configured) in your browser.

---

## Quick Start

For a quick development setup, create a `.env` file with your database URL and desired port:

echo "PORT=4000\nDB_URL=mongodb://localhost:27017/permitfront" > .env

Then run:

npm run dev

The development server launches at `http://localhost:4000`.

---

## Configuration

Create a `.env` file at the project root to override default settings:

PORT=4000  
DB_URL=mongodb://localhost:27017/permitfront

| Variable | Default | Description |
|----------|---------|-------------|
| PORT     | 3000    | Port on which the server listens. |
| DB_URL   | –       | Connection string for your database (MongoDB, PostgreSQL, or any driver‑compatible DB). |

> The project ships with a `.env.example` file that contains all supported variables.

---

## Running the App

npm start   # Production  

npm run dev  # Development (auto‑refresh)

The server will be accessible at `http://localhost:<PORT>` (default `3000`).

---

## Development

npm install   # Install dev dependencies  

npm run lint   # Lint the code  

npm run format   # Format the code  

Enable type‑checking and run tests as part of CI.

---

## Testing

All tests are written with Jest. Run them with:

npm test

Coverage reports are generated in the `coverage/` directory.

---

## Contributing

1. **Create a branch** – `feature/<name>` or `fix/<description>`.  
2. **Rebase** – keep your branch up to date with `main`:

   git pull --rebase origin main

3. **Lint & test** – run `npm run lint` and `npm test` before committing.  
4. **Open a PR** – provide a clear title, description and reference any related issue.

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

MIT © [Shubhyagami](https://github.com/shubhyagami)
