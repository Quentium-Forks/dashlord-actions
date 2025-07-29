# DashLord Actions - updown-init

Create missing [updown.io](https://updown.io) entries from a local `dashlord.yaml` config file

The default recipients can be defined in the dashlord config `updownioRecipients` array.

You get extract recipients ID's from your Dev Console in the [updown.io bulk edit page](https://updown.io/checks/recipients):

```js
const recipients = Array.from(
  document.body.querySelectorAll("#bulk-update-table tr:nth-child(2) input")
);
console.log(
  recipients.map((n) => ({ value: n.value, id: n.dataset.recipientIdentifier }))
);
```

## Usage

```yaml
jobs:
  html:
    name: Create updown.io checks
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - uses: SocialGouv/dashlord-actions/updown-init@v1
        env:
          UPDOWNIO_API_KEY: ${{ secrets.UPDOWNIO_API_KEY }} # write-enabled updown.io token
```
