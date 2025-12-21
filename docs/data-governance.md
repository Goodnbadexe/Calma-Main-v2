Data Governance and PII Handling

- PII ingress only via `api/register/submit`; do not store PII client-side
- Transport over HTTPS with HSTS; enforce secure cookies for any sessions
- Apply IP rate limiting and CAPTCHA on public endpoints
- Validate inputs server-side; reject malformed or unexpected fields
- Persistence layer must encrypt data at rest and in transit
- Access controls: least privilege, role-based access, audit logging
- Retention: 12 months default; implement deletion on request
- Backups: encrypted, limited access, tested restore procedures
- Exports: only via approved workflows; anonymize whenever possible
- Monitoring: alert on anomaly spikes and repeated failures
