# permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![GitHub release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![GitHub issues](https://img.shields.io/github/issues/shubhyagami/permitfront)](https://github.com/shubhyagami/permitfront/issues)

A frontend web application for managing permit applications. It provides an interface to track application statuses, manage user roles, and coordinate reviews to prevent overlapping concurrent edits.

## Features

- **Permit Tracking**: Monitor application progress and status from submission through approval.
- **Role Management**: Assign and manage permissions for reviewers and applicants.
- **Overlap Prevention**: Built-in detection prevents conflicting edits when multiple reviewers modify a permit simultaneously.
- **Optimized Performance**: Memoized selectors ensure fast dashboard load times and smooth UI rendering.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install
npm start
```

## Contributing

Contributions are welcome! To propose a feature or fix a bug:

1. Check existing issues before opening a new one.
2. Fork the repository and create a branch (`feature/your-feature-name` or `fix/bug-description`).
3. Keep your branch updated with `main` using `git pull --rebase`.
4. Run `npm test` to verify your changes do not introduce edit overlap bugs.
5. Open a pull request against `main` and link the related issue.

## Changelog

### v1.1.0 - 2026-08-05
- Added signature verification for permit submissions.
- Fixed edge case where edit overlap detection missed concurrent edits in parallel sessions.
- Upgraded `temporal-utils` to v2.3.1.

### v1.0.1 - 2026-07-27
- Enhanced anomaly detection with real-time branch synchronization.

### v1.0.0 - 2026-07-25
- Initial release.
- Added permit tracking, status dashboard, and user role management.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
