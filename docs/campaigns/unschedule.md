---
title: Unschedule a campaign
sidebar_label: Unschedule
sidebar_position: 10
---

This method turns a scheduled campaign back into a draft and hands back the sending quota its schedule reserved. Its schedule and recipients are cleared; to schedule it again, call [Schedule](./schedule.md) with the time and recipients. The campaign must belong to the brand your API key belongs to.

**URL**  
https://dashboard.skry.be/api/campaigns/unschedule.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the scheduled campaign.

**RESPONSE** (JSON)

On success you get a JSON object. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{"status":"draft","campaign_id":1234}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Campaign is not scheduled` (also returned if it started sending in the meantime)

Error: `Unable to unschedule campaign`

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

fetch("https://dashboard.skry.be/api/campaigns/unschedule.php", requestOptions)
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
  url: 'https://dashboard.skry.be/api/campaigns/unschedule.php',
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
