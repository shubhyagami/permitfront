# Permitfront
-------------
[![Badge: MIT License](https://img.shields.io/badge/licence-MIT-yellow)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![GitHub release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)

Permitfront is an open-source web application designed to streamline the complex permit application process. It simplifies tracking application progress, managing user roles, and preventing concurrent edits, ensuring seamless coordination among reviewers.

## Key Features
### Permit Tracking
Sleek dashboard for monitoring application progress from submission to approval.

### Role Management
Effortless permission management for reviewers and applicants, maintaining data integrity.

### Overlap Prevention
Built-in detection mechanism preventing conflicting edits on permits being simultaneously modified.

## Getting Started

Permitfront requires Node.js (LTS version recommended) and npm installed. To set up your environment:

1. Clone the repository using `git clone https://github.com/shubhyagami/permitfront.git`.
2. Navigate to the project directory `cd permitfront`.
3. Install dependencies with `npm install`.
4. Start the application with `npm start`.

## Quick Start

Get Permitfront up and running in minutes by following the above setup process. Once installed, explore the application features, and familiarize yourself with the interface.

## Contributing

Contributions are welcome! To propose a feature or fix a bug:

1. Review existing issues before opening a new one.
2. Fork the repository and create a feature branch or fix branch (`feature/your-feature-name` or `fix/bug-description`).
3. Regularly update your branch using `git pull --rebase`.
4. Run `npm test` to ensure your changes do not introduce conflicts.

## Release Notes

### v1.1.0 (August 2026)
Enhanced security with permit submission signature verification and resolve edge case where edit overlap detection missed concurrent edits.

### v1.0.1 (July 2026)
Improved anomaly detection with real-time branch synchronization.

### v1.0.0 (June 2026)
Initial release, introducing permit tracking and user role management.

## License

Permitfront is licensed under the permissive MIT License. For more details, please refer to the [LICENSE](LICENSE) file.
