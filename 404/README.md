# DashLord Actions - Detect 404

Detect 404 for a URL and report results as JSON

## Usage

```yaml
jobs:
  scans:
    name: Detect 404
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/404@v1
        with:
          url: ${{ matrix.url }}
          output: scans/404.json
```
