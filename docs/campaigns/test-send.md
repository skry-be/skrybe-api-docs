---
title: Send a test email
sidebar_label: Test send
sidebar_position: 7
---

This method sends a campaign as a test to up to 5 email addresses, like the test-send box in the dashboard. Personalization tags are replaced with their fallback values, and the subject gets the brand's test email prefix if one is set. The campaign must belong to the brand your API key belongs to.

:::note Limits
- At most 5 addresses per request.
- At most 20 test-send requests per brand per hour (shared with test sends from the dashboard).
- Each test email counts as one email against the brand's sending quota.
:::

**URL**  
https://dashboard.skry.be/api/campaigns/test-send.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the campaign to send.
3. `emails` the addresses to send the test to, single or comma-separated (at most 5). Duplicates are ignored.

**RESPONSE** (JSON)

When the test was attempted you get a JSON object with one result per address. An address can fail on its own (eg. rejected by the mail server) while the others succeed, so check `ok` for each. Errors that stop the whole request are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "campaign_id": 1234,
  "results": [
    { "email": "me@example.com", "ok": true, "error": null },
    { "email": "colleague@example.com", "ok": false, "error": "<error from the mail server>" }
  ]
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Email addresses not passed`

Error: `Too many email addresses`

Error: `Invalid email address.`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Unauthorised From email domain`

Error: `Brand is under review due to high bounce rate. Sending is disabled.`

Error: `Quota exceeded. Please upgrade your plan.`

Error: `Domain not verified in SES. Please verify your domain before sending.`

Error: `Test send rate limit reached. Please wait about <n> minute(s) and try again.`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("emails", "me@example.com,colleague@example.com");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/test-send.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'campaign_id': '1234',
  'emails': 'me@example.com,colleague@example.com'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/test-send.php',
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
