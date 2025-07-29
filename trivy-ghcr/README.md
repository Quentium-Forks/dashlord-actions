# DashLord Actions - trivy-ghcr

Run trivy scans on multiple GHCR images repos and produce JSON output

## Usage

```yaml
jobs:
  scans:
    name: Trivy scans on GHCR
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: test
        uses: SocialGouv/dashlord-actions/trivy-ghcr@v1
        with:
          repos: socialgouv/sample-next-app,socialgouv/www
          output: trivy.json

      - uses: actions/upload-artifact@v4
        with:
          name: trivy.json
          path: trivy.json
```
