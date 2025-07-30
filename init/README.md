# DashLord Actions - init

Parse a `dashlord.yaml` or `urls.txt` file to generate a list of urls to use in a GitHub action jobs matrix.

## Usage

See how `needs.init.outputs.sites` is used in the matrix definition

```yaml
jobs:
  init:
    name: Initialize sites
    runs-on: ubuntu-latest
    outputs:
      sites: ${{ steps.init.outputs.sites }}
      config: ${{ steps.init.outputs.config }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - id: init
        uses: SocialGouv/dashlord-actions/init@v1

  scans:
    name: Run scans
    runs-on: ubuntu-latest
    needs: init
    strategy:
      fail-fast: false
      max-parallel: 3
      matrix:
        sites: ${{ fromJson(needs.init.outputs.sites) }}
    steps:
      - name: Mozilla HTTP Observatory
        if: ${{ matrix.sites.tools.httpobs }}
        continue-on-error: true
        timeout-minutes: 15
        uses: SocialGouv/httpobs-action@master
        with:
          url: ${{ matrix.sites.url }}
          output: scans/http.json
```

### Expected dashlord.yaml

```yaml
title: Test 1
tools:
  "404": true
  budget_page: true
  codescan: true
  dependabot: true
  http: true
  lighthouse: true
  nmap: true
  nuclei: false
  screenshot: true
  stats: true
  testssl: true
  thirdparties: true
  updownio: true
  wappalyzer: true
  zap: true
urls:
  - url: https://www.free.fr
    title: Free
    repositories:
      - iliad/free-ui
      - iliad/free-api
  - url: invalid-url
  - url: http://chez.com
    repositories:
      - chez/chez-ui
      - chez/chez-api
    tools:
      screenshot: false
      updownio: false
  - url: https://voila.fr
```

## Hacking

```shell
cd init/
yarn all
yarn test -u # update jest snapshots
```
