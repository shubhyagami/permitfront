# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)

Permitfront is an open‑source web application that simplifies the permit‑application workflow. It provides a clear dashboard for tracking permits, manages user roles, and prevents concurrent edits, making collaboration among reviewers smooth and error‑free.

## Key Features
- **Permit Tracking** – Interactive dashboard to monitor a permit’s lifecycle from submission to approval.  
- **Role Management** – Simple tools for assigning and controlling reviewer and applicant permissions while preserving data integrity.  
- **Overlap Prevention** – Automatic detection of conflicting edits, stopping simultaneous modifications on the same permit.

## Getting Started
Permitfront runs on Node.js (LTS version recommended) and npm.

1. **Clone the repo**  
   ```bash
   git clone https://github.com/shubhyagami/permitfront.git
   cd permitfront
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the app**  
   ```bash
   npm start
   ```

## Contributing
We welcome contributions!  
1. Check existing issues before opening a new one.  
2. Fork the repository and create a feature or fix branch (`feature/<name>` or `fix/<description>`).  
3. Keep your branch updated with the latest changes (`git pull --rebase`).  
4. Run tests to ensure your changes don’t break anything:  
   ```bash
   npm test
   ```

## Release Notes
- **v1.1.0 (August 2026)** – Added signature verification for permit submissions and fixed edge‑case overlap detection.  
- **v1.0.1 (July 2026)** – Enhanced real‑time branch synchronization for anomaly detection.  
- **v1.0.0 (June 2026)** – Initial release with permit tracking and user role management.

## License
Permitfront is released under the MIT License. See the [LICENSE](LICENSE) file for details.
