# Security Policy

## Supported Versions

Firmware releases and active branches supported with security updates:

| Version | Supported | Notes |
| :--- | :--- | :--- |
| `main` (trunk) | Yes | Current development branch. |
| `< 1.0.0` | No | Legacy sketch revisions. |

## Reporting a Vulnerability

Do not open public GitHub issues for security vulnerabilities.

If you identify a security issue related to unintended USB HID keystroke injection, malformed IR packet buffer overflows, or device lockup vectors, report it through one of the following channels:

1. Open a private security advisory through the [GitHub Advisory Tab](https://github.com/AtaCanYmc/RemoteStation/security/advisories/new).
2. Email the maintainer directly at `atacanymc@gmail.com` with the subject line `[SECURITY] RemoteStation Vulnerability Report`.

### Required Information

Include the following technical details in your report:
- Board model and crystal frequency (e.g. Arduino Leonardo 16MHz ATmega32U4).
- Exact IR remote model and protocol hex sequence triggering the condition.
- Steps to reproduce the issue.
- Observed system impact on the host operating system or PlayStation 4 console.

### Response SLA

- Initial response and acknowledgment: Within 48 hours.
- Vulnerability triage and validation: Within 5 business days.
- Fix delivery and public disclosure coordination: Within 30 days.
