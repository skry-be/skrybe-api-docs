---
title: Autoresponder stats
sidebar_label: Autoresponder stats
sidebar_position: 3
---

This method returns the opens, clicks, bounces, complaints and unsubscribes of one autoresponder email, counted the same way as its report in the app.

**URL**  
https://dashboard.skry.be/api/autoresponders/autoresponder-stats.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `email_id` the numeric id of the autoresponder email, as returned in `email_list` by [Get autoresponder emails](./get-autoresponder-emails.md).

**RESPONSE** (JSON)

Success:

```json
{
  "id": 41,
  "autoresponder_id": 3,
  "recipients": 1874,
  "opens": {
    "total": 1502,
    "unique": 1033,
    "rate": 55.69
  },
  "clicks": {
    "total": 388,
    "unique": 251,
    "rate": 13.39
  },
  "bounces": {
    "hard": 19,
    "soft": 7
  },
  "complaints": 1,
  "unsubscribes": 12,
  "links": [
    {
      "url": "https://acme.com/start",
      "clicks": 301,
      "unique_clicks": 198
    },
    {
      "url": "https://acme.com/pricing",
      "clicks": 87,
      "unique_clicks": 61
    }
  ]
}
```

- `recipients` how many people the email has been sent to
- `opens` `total` opens, `unique` openers, and `rate`: unique openers as a percentage of delivered emails (recipients minus hard bounces), to two decimals
- `clicks` `total` clicks, `unique` clickers, and `rate`: unique clickers as a percentage of recipients
- `bounces` `hard` and `soft` bounces
- `complaints` and `unsubscribes` attributed to this email
- `links` each tracked link with its `clicks` and `unique_clicks`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Email ID not passed`

Error: `Autoresponder email does not exist`

An email that belongs to another brand is reported as `Autoresponder email does not exist`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("email_id", "41");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/autoresponders/autoresponder-stats.php", requestOptions)
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
  'api_key': '<YOUR_API_KEY>',
  'email_id': '41'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/autoresponders/autoresponder-stats.php',
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
