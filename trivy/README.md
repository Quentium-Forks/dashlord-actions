# DashLord Actions - trivy

Run trivy scans on multiple docker images and produce JSON output

## Usage

```yaml
jobs:
  scans:
    name: Trivy scans
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v5

      - name: test
        uses: SocialGouv/dashlord-actions/trivy@v1
        with:
          images: ghcr.io/socialgouv/front,ghcr.io/socialgouv/back
          output: trivy.json

      - uses: actions/upload-artifact@v4
        with:
          name: trivy.json
          path: trivy.json
```
