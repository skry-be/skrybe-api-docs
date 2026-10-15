---
title: Delete a campaign
sidebar_label: Delete
sidebar_position: 6
---

This method deletes a campaign along with its links and attachments. Deleting a scheduled campaign hands back the sending quota its schedule reserved. A sent campaign can be deleted too, which also deletes its report.

A campaign that is `preparing` or `sending` can't be deleted through the API; stop it in the dashboard first. The campaign must belong to the brand your API key belongs to.

**URL**  
https://dashboard.skry.be/api/campaigns/delete-campaign.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the campaign to delete.

**RESPONSE** (JSON)

On success you get a JSON object. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{"campaign_id":1234,"deleted":true}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Campaign is sending` (the campaign is preparing or sending)

Error: `Unable to delete campaign`

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

fetch("https://dashboard.skry.be/api/campaigns/delete-campaign.php", requestOptions)
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
  url: 'https://dashboard.skry.be/api/campaigns/delete-campaign.php',
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
