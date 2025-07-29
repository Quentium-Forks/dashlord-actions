# DashLord Actions - ecoindex

Caclulate the Ecoindex score for a URL: https://www.ecoindex.fr/ecoconception/

## Usage

```yaml
jobs:
  scans:
    name: Ecoindex Scan
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/ecoindex@v1
        with:
          url: ${{ matrix.url }}
          output: scans/ecoindex.json
```
