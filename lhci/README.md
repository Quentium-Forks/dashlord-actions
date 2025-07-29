# DashLord Actions - lhci

Collect LHCI results for a URL

## Usage

```yaml
jobs:
  scans:
    name: LHCI scans
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/lhci@v1
        with:
          url: ${{ matrix.url }}
          # optionals
          language: fr
          collectFlags: "--numberOfRuns=3"
          chromeFlags: "--window-size=800x600 --disable-gpu"

      - name: demo
        run: |
          cat result.html
```
