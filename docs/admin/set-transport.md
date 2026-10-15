---
title: Set transport
sidebar_label: Set transport
sidebar_position: 5
---

This method shows or switches how a brand sends its email: through Skrybe's SMTP relay, or through Amazon SES. Leave out `transport` to only read the brand's current setting. The brand must belong to the main account.

**URL**  
https://dashboard.skry.be/api/admin/brands/set-transport.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key. Brand keys are rejected with `Invalid API key`.
2. `brand_id` the numeric id of the brand, as returned by [Get brands (admin)](./get-brands.md).
3. `transport` `relay` or `ses`. Leave it out to only read the current setting. (optional)
4. `smtp_password` relay only: the relay password for the brand's login. It can be left out when the brand already has a password stored for the same username. (optional)
5. `smtp_username` relay only: the relay login. Defaults to the brand's relay login, `brand<brand_id>` (eg. `brand7`) in production. On the Skrybe relay it must be exactly that login, because the relay routes the brand's bounces back by it. (optional)
6. `smtp_host` relay only: the SMTP server. Defaults to the Skrybe relay, `mta1.skry.be`. (optional)
7. `verify` relay only: `1` (the default) checks the login before saving; `0` skips the check. (optional)
8. `force` set to `1` to switch even while one of the brand's campaigns is sending. (optional)

**RESPONSE** (JSON)

Success: the brand's sending settings after the change (or as they are, if you left out `transport`).

```json
{
  "brand_id": 7,
  "name": "Acme",
  "transport": "relay",
  "smtp_host": "mta1.skry.be",
  "smtp_port": "587",
  "smtp_ssl": "tls",
  "smtp_username": "brand7",
  "smtp_password_set": true
}
```

- `brand_id` and `name` the brand
- `transport` how the brand now sends: `relay` (the Skrybe relay), `ses`, or `smtp` (some other SMTP server, set by hand in the brand's settings)
- `smtp_host`, `smtp_port`, `smtp_ssl`, `smtp_username` the brand's stored SMTP settings, as stored (the port is a string)
- `smtp_password_set` whether a password is stored. The password itself is never returned.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand ID not passed`

Error: `No brand with that ID in this account`

Error: `transport must be relay or ses`

Error: `RELAY_ENVIRONMENT is not set on this server, so the relay login can't be chosen. Set it to production, staging, ...`

Error: `smtp_username does not match this environment: the relay login for this brand here is <login>`

Error: `Invalid smtp_username`

Error: `Invalid smtp_host`

Error: `smtp_password not passed, and the brand has none stored for this username`

Error: `A campaign of this brand is sending. Wait for it to finish, or pass force=1`

Error: `Unable to update brand`

### Switching to the relay

`transport=relay` stores the host, the username, the password (if you passed one), port `587` and `smtp_ssl` `tls` (STARTTLS). The relay always uses port 587 with STARTTLS.

Unless you pass `verify=0`, Skrybe first checks the settings against the server the way a real send would: it connects, starts TLS, logs in, and offers the brand's From address as both sender and recipient, then stops before any message is sent. Nothing is delivered. This catches a mistyped password, or a brand whose domain hasn't been set up on the relay, before the brand's mail starts failing. If the check fails, nothing is saved and the response is a plain-text reason, for example:

- `Could not connect to mta1.skry.be:587: ...`
- `TLS failed with mta1.skry.be: ...`
- `The relay refused the login brand7: ...`
- `The relay refused news@acme.com for brand7: ...`

`smtp_username` may only contain letters, digits, `.`, `_` and `-` (up to 100 characters), and `smtp_host` must be a hostname.

### Switching to SES

`transport=ses` only clears the brand's SMTP host. The username and password stay stored, so you can switch back to the relay later without passing the password again. It also takes a brand off any other SMTP server that was set by hand.

### Campaigns that are sending

A campaign that takes a while to send is picked up in several runs, and each run uses the brand's transport at that moment. Switching mid-send would split the campaign across two transports, so the switch is refused with `A campaign of this brand is sending. Wait for it to finish, or pass force=1` unless you pass `force=1`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<MAIN_ACCOUNT_API_KEY>");
urlencoded.append("brand_id", "<BRAND_ID>");
urlencoded.append("transport", "relay");
urlencoded.append("smtp_password", "<RELAY_PASSWORD>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/admin/brands/set-transport.php", requestOptions)
  .then(response => response.text())
  // Success is JSON; errors are plain text
  .then(text => {
    try { console.log(JSON.parse(text)); }
    catch (e) { console.log('error', text); }
  })
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<MAIN_ACCOUNT_API_KEY>',
  'brand_id': '<BRAND_ID>',
  'transport': 'relay',
  'smtp_password': '<RELAY_PASSWORD>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/admin/brands/set-transport.php',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```
