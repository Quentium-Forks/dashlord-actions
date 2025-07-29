# DashLord Actions - detect-404

Detect 404 for a URL and report results as JSON

## Usage

```yaml
jobs:
  scans:
    name: Detect 404
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/detect-404@v1
        with:
          url: ${{ matrix.url }}
          output: scans/detect-404.json
```
