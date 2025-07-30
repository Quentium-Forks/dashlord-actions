# DashLord Actions - httpobs

Run Mozilla HTTP Observatory scan and report results as JSON

## Usage

```yaml
jobs:
  scan:
    name: Run HTTP Observatory Scan
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/httpobs@v1
        with:
          url: ${{ matrix.url }}
          output: scans/httpobs.json
```
