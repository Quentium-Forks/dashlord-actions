# DashLord Actions - tracking

Detect tracking service for a URL and report results as JSON

## Usage

```yaml
jobs:
  scans:
    name: Detect tracking service
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/tracking@v1
        with:
          url: ${{ matrix.url }}
          output: scans/tracking.json
```
