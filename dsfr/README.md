# DashLord Actions - dsfr

Detect DSFR for a URL and report results as JSON

## Usage

```yaml
jobs:
  scans:
    name: Detect DSFR
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/dsfr@v1
        with:
          url: ${{ matrix.url }}
          output: scans/dsfr.json
```
