---
title: Campaign stats
sidebar_label: Stats
sidebar_position: 11
---

This method returns a campaign's report numbers: opens, clicks (overall and per link), bounces, complaints and unsubscribes. The campaign must belong to the brand your API key belongs to. To see who opened, clicked and so on, use [Activity](./activity.md).

**URL**  
https://dashboard.skry.be/api/campaigns/stats.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the campaign's ID.

**RESPONSE** (JSON)

On success you get a JSON object. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "id": 1234,
  "status": "sent",
  "recipients": 5120,
  "opens": { "total": 3410, "unique": 2214, "rate": 43.68 },
  "clicks": { "total": 802, "unique": 517, "rate": 10.1 },
  "bounces": { "hard": 52, "soft": 18 },
  "complaints": 2,
  "unsubscribes": 23,
  "links": [
    { "url": "https://example.com/october-sale", "clicks": 640, "unique_clicks": 431 },
    { "url": "https://example.com/blog", "clicks": 162, "unique_clicks": 119 }
  ]
}
```

- `recipients` the number of emails sent so far.
- `opens.total` / `clicks.total` count every open and click; `unique` counts each subscriber once.
- `opens.rate` unique opens as a percentage of delivered emails (recipients minus hard bounces), rounded to 2 decimals.
- `clicks.rate` unique clickers as a percentage of recipients, rounded to 2 decimals.
- `links` one entry per tracked link with its total and unique clicks. Clicks on Skrybe's own footer link are left out.
- `bounces`, `complaints` and `unsubscribes` are counted the way the campaign report counts them: against the last campaign each subscriber received. A subscriber who has been sent a later campaign since is counted against that one instead.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/stats.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'campaign_id': '1234'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/stats.php',
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
