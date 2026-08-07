# permitfront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/shubhyagami/permitfront/actions)
[![GitHub release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![GitHub stars](https://img.shields.io/github/stars/shubhyagami/permitfront?style=social)](https://github.com/shubhyagami/permitfront/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/shubhyagami/permitfront)](https://github.com/shubhyagami/permitfront/issues)

A frontend web application for managing permit applications. It provides an interface to track application statuses, manage user roles, and coordinate reviews to prevent overlapping concurrent edits.

## Features

- **Permit Tracking**: Monitor application statuses and progress from submission to approval.
- **User Role Management**: Assign and manage permissions for reviewers and applicants.
- **Edit Overlap Prevention**: Built-in detection system to prevent conflicting edits when multiple reviewers are viewing or modifying a permit simultaneously.
- **Optimized Performance**: Utilizes memoized selectors to ensure fast dashboard load times and smooth UI rendering.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js and npm installed on your development machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/shubhyagami/permitfront.git

# Navigate to the project directory
cd permitfront

# Install dependencies
npm install

# Start the development server
npm start
```

## Contributing

Contributions are welcome and greatly appreciated! If you have an idea for a new feature or want to fix a bug, please follow these steps:

1. **Check for existing issues**: Before opening a new issue, check if your bug or feature request has already been reported.
2. **Open an issue**: If not, open a new issue describing the bug or feature request in detail.
3. **Fork and branch**: Fork the repository and create a new branch for your work (e.g., `feature/your-feature-name` or `fix/bug-description`).
4. **Keep your branch updated**: Ensure your branch is up to date with `main` by using `git pull --rebase` to avoid complex merge conflicts.
5. **Test your changes**: Run `npm run tva-check` and the standard test suite before submitting a pull request to ensure your code does not introduce overlapping edit bugs.
6. **Open a pull request**: Submit your PR to the `main` branch with a clear description of the changes and a reference to the original issue.

## Changelog

### v1.1.0 - 2026-08-05
- Introduced temporal signature verification for all permit submissions.
- Fixed an issue where the edit overlap detection system would occasionally miss concurrent edits in parallel sessions.
- Upgraded dependency `temporal-utils` to v2.3.1.

### v1.0.1 - 2026-07-27
- Enhanced anomaly detection with real-time branch synchronization.

### v1.0.0 - 2026-07-25
- Initial release of `permitfront`.
- Added streamlined permit application tracking, status dashboard, and user role management.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
