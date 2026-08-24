# Permitfront
-------------
[![Badge: MIT License](https://img.shields.io/badge/licence-MIT-yellow)](https://opensource.org/licenses/MIT)
[![Node.js CI](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml/badge.svg)](https://github.com/shubhyagami/permitfront/actions/workflows/node.js.yml)
[![GitHub release](https://img.shields.io/github/v/release/shubhyagami/permitfront?include_prereleases)](https://github.com/shubhyagami/permitfront/releases)

Permitfront is a web application designed to streamline the permit application process. It provides a user-friendly interface to track application statuses, manage user roles, and prevent overlapping concurrent edits, ensuring seamless coordination among reviewers.

## Features

### Permit Tracking
Monitor application progress from initial submission to final approval with ease.

### Role Management
Effortlessly assign and manage permissions for reviewers and applicants to maintain data integrity.

### Overlap Prevention
Built-in detection prevents conflicting edits when multiple reviewers modify a permit simultaneously.

### Optimized Performance
Memoized selectors ensure fast dashboard load times and smooth UI rendering for an enhanced user experience.

## Getting Started

To start using Permitfront, ensure you have Node.js (LTS recommended) and npm installed on your machine.

```bash
git clone https://github.com/shubhyagami/permitfront.git
cd permitfront
npm install
npm start
```

## Contributing

Contributions are welcome and encouraged! To propose a feature or fix a bug:

1. Check existing issues before opening a new one.
2. Fork the repository and create a branch (`feature/your-feature-name` or `fix/bug-description`).
3. Keep your branch updated with `main` using `git pull --rebase`.
4. Run `npm test` to verify your changes do not introduce edit overlap bugs.
5. Open a pull request against `main` and link the related issue.

## Changelog

### v1.1.0 - August 2026
- Enhanced security with signature verification for permit submissions.
- Resolved edge case where edit overlap detection missed concurrent edits in parallel sessions.

### v1.0.1 - July 2026
- Improved anomaly detection with real-time branch synchronization.

### v1.0.0 - June 2026
- Initial release, introducing permit tracking, status dashboard, and user role management.

## License

Permitfront is licensed under the permissive MIT License. For further details, please refer to the [LICENSE](LICENSE) file.
