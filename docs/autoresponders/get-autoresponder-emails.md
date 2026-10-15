---
title: Get autoresponder emails
sidebar_label: Get autoresponder emails
sidebar_position: 2
---

This method returns one autoresponder with its emails, in the order they are sent. Autoresponders are read-only through the API; create and edit them in the app.

**URL**  
https://dashboard.skry.be/api/autoresponders/get-autoresponder-emails.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `autoresponder_id` the numeric id of the autoresponder, as returned by [Get autoresponders](./get-autoresponders.md).

**RESPONSE** (JSON)

Success: the autoresponder, in the same format as [Get autoresponders](./get-autoresponders.md), with its emails in `email_list`.

```json
{
  "id": 3,
  "name": "Welcome series",
  "type": "drip",
  "list_id": "Vg4f763Kq892Lm0aPz7xYw",
  "custom_field": null,
  "emails": 3,
  "enabled_emails": 2,
  "email_list": [
    {
      "id": 41,
      "autoresponder_id": 3,
      "subject": "Welcome to Acme",
      "from_name": "Acme",
      "from_email": "news@acme.com",
      "when": "immediately",
      "enabled": true,
      "recipients": 1874,
      "created_at": 1715938800
    },
    {
      "id": 42,
      "autoresponder_id": 3,
      "subject": "Getting started",
      "from_name": "Acme",
      "from_email": "news@acme.com",
      "when": "+3 days",
      "enabled": false,
      "recipients": 1210,
      "created_at": 1715942400
    }
  ]
}
```

Each email has:

- `id` the email's numeric id (use it with [Autoresponder stats](./autoresponder-stats.md))
- `autoresponder_id` the autoresponder it belongs to
- `subject`, `from_name`, `from_email`
- `when` when it is sent, as stored: `immediately`, or an offset such as `+3 days` or `+2 hours`
- `enabled` whether it is being sent
- `recipients` how many people it has been sent to
- `created_at` when it was created, as a Unix timestamp, or `null`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Autoresponder ID not passed`

Error: `Autoresponder does not exist`

An autoresponder that belongs to another brand is reported as `Autoresponder does not exist`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("autoresponder_id", "3");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/autoresponders/get-autoresponder-emails.php", requestOptions)
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
  'autoresponder_id': '3'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/autoresponders/get-autoresponder-emails.php',
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
