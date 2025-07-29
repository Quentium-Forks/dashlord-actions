# DashLord Actions - save

Save results from various URL scanners into a single folder for DashLord

## Usage

```yaml
jobs:
  scans:
    name: Save results
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/save@v1
        with:
          url: ${{ matrix.url }}
```
