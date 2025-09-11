# DashLord Actions - sonarcloud

This GitHub action extract data from [SonarCloud Web API](https://docs.sonarcloud.io/advanced-setup/web-api/)

## Inputs

### `repos`

Comma-separated list of projects to get results for. example : `microsoft_kiota, deskflow_deskflow`.

The naming of the projects should match the ones in SonarCloud.

### `output` (optional)

Path for the JSON result file. defaults to `sonarcloud.json`.

## Usage

```yaml
jobs:
  scans:
    name: SonarCloud scans
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/sonarcloud@v1
        with:
          repos: facebook/react, isbang/compose-action

      - run: |
          cat sonarcloud.json
```

Add `SONARCLOUD_API_TOKEN` in environment if your project is not public.
