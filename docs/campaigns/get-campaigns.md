---
title: Get campaigns
sidebar_label: Get campaigns
sidebar_position: 2
---

This method returns the campaigns in the brand your API key belongs to, newest first, a page at a time. You can filter them by status.

**URL**  
https://dashboard.skry.be/api/campaigns/get-campaigns.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `page` the page to return, starting at 1. Default is `1`. (optional)
3. `limit` how many campaigns per page, from 1 to 100. Default is `10`. Values outside that range are clamped to it. (optional)
4. `status` only return campaigns with this status: `draft`, `scheduled`, `preparing`, `sending`, `sent` or `paused`. (optional)

Campaign statuses:

- `draft` not sent and not scheduled
- `scheduled` waiting for its scheduled time
- `preparing` sent, but delivery hasn't started yet
- `sending` delivery is in progress
- `sent` delivery has finished
- `paused` sending was stopped

**RESPONSE** (JSON)

On success you get a JSON object with one entry per campaign, keyed `campaign1`, `campaign2` and so on in the order returned. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "campaign1": {
    "id": 1234,
    "title": "October newsletter",
    "subject": "What's new this October",
    "status": "sent",
    "from_name": "Mayo",
    "from_email": "contact@example.com",
    "reply_to": "contact@example.com",
    "recipients": 5120,
    "to_send": 5120,
    "sent_at": 1760536800,
    "scheduled_at": null,
    "timezone": null,
    "source": "api"
  },
  "campaign2": {
    "id": 1233,
    "title": "Black Friday teaser",
    "subject": "Something big is coming",
    "status": "scheduled",
    "from_name": "Mayo",
    "from_email": "contact@example.com",
    "reply_to": "contact@example.com",
    "recipients": 0,
    "to_send": 0,
    "sent_at": null,
    "scheduled_at": 1763978400,
    "timezone": "America/New_York",
    "source": "ui"
  }
}
```

- `title` is the campaign's dashboard label, or its subject when it has no label.
- `recipients` is how many emails have gone out so far; `to_send` is how many the send is going to.
- `sent_at` is a Unix timestamp of when sending started, or `null` if it hasn't.
- `scheduled_at` and `timezone` are set only for scheduled campaigns (`scheduled_at` is a Unix timestamp).
- `source` is where the campaign was created, eg. `ui` (the dashboard) or `api`.

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Invalid status`

Error: `No campaigns found` (also returned for a page past the last one)

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("page", "1");
urlencoded.append("limit", "20");
urlencoded.append("status", "sent");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/get-campaigns.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'page': '1',
  'limit': '20',
  'status': 'sent'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/get-campaigns.php',
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
