# Permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![Release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)

Permitfront is an open‑source web application that streamlines the permit‑application workflow. It offers a clear dashboard for tracking permits, manages user roles, and prevents concurrent edits, making collaboration among reviewers smooth and error‑free.

## Key Features
- **Permit Tracking** – Interactive dashboard visualizing a permit’s lifecycle from submission to approval.  
- **Role Management** – Simple tools for assigning and controlling reviewer and applicant permissions while preserving data integrity.  
- **Overlap Prevention** – Automatic detection of conflicting edits, stopping simultaneous modifications on the same permit.  
- **Real‑time Updates** – Keeps all stakeholders synchronized with the latest changes.

## Getting Started
Permitfront runs on Node.js (LTS version recommended) and npm.

### Prerequisites
- Node.js ≥ 18 installed  
- (Optional) `PORT` and `DB_URL` environment variables for custom configurations

### Installation & Run
1. **Clone the repository**  
   ```bash
   git clone https://github.com/shubhyagami/permitfront.git
   cd permitfront
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Start the application**  
   ```bash
   npm start
   ```

### Environment Variables
- `PORT` – Port on which the server listens (default: 3000)  
- `DB_URL` – Connection string for the database (e.g., MongoDB, PostgreSQL)

## Contributing
We welcome contributions!  
1. Review existing issues before opening a new one.  
2. Fork the repository and create a feature or fix branch (`feature/<name>` or `fix/<description>`).  
3. Keep your branch updated with the latest changes (`git pull --rebase`).  
4. Run the test suite to verify your changes:  
   ```bash
   npm test
   ```

## Changelog
- **v1.1.0 (August 2026)** – Added signature verification for permit submissions and refined overlap detection.  
- **v1.0.1 (July 2026)** – Improved real‑time synchronization for anomaly detection.  
- **v1.0.0 (June 2026)** – Initial release with permit tracking and role management.

## License
Permitfront is released under the MIT License. See the [LICENSE](LICENSE) file for details.
