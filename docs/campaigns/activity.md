---
title: Campaign activity
sidebar_label: Activity
sidebar_position: 12
---

This method lists the subscribers who opened, clicked, bounced, complained or unsubscribed from a campaign, a page at a time. It's the API version of the per-subscriber exports on the campaign report. The campaign must belong to the brand your API key belongs to.

Opens and clicks are listed in the order subscribers first opened or clicked. Bounces, complaints and unsubscribes are counted against the last campaign each subscriber received, as in the report, so a subscriber who has been sent a later campaign since shows up under that one instead. Subscribers deleted since are left out.

**URL**  
https://dashboard.skry.be/api/campaigns/get-activity.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the campaign's ID.
3. `type` which activity to list: `opens`, `clicks`, `bounces`, `complaints` or `unsubscribes`. Default is `opens`. (optional)
4. `page` the page to return, starting at 1. Default is `1`. (optional)
5. `limit` how many subscribers per page, from 1 to 1000. Default is `100`. (optional)

**RESPONSE** (JSON)

On success you get a JSON object. `total` is the number of subscribers across all pages. Errors are returned as plain text. Every response is returned with HTTP status 200.

For `type=opens`, each entry has the number of times the subscriber opened and their country code (or `null` if unknown):

```json
{
  "campaign_id": 1234,
  "type": "opens",
  "page": 1,
  "limit": 100,
  "total": 2214,
  "activity": [
    { "email": "ada@example.com", "name": "Ada", "list_id": "<ENCRYPTED_LIST_ID>", "opens": 3, "country": "NG" },
    { "email": "grace@example.com", "name": "Grace", "list_id": "<ENCRYPTED_LIST_ID>", "opens": 1, "country": null }
  ]
}
```

For `type=clicks`, each entry has the number of clicks and the links clicked (Skrybe's own footer link is left out):

```json
{
  "campaign_id": 1234,
  "type": "clicks",
  "page": 1,
  "limit": 100,
  "total": 517,
  "activity": [
    { "email": "ada@example.com", "name": "Ada", "list_id": "<ENCRYPTED_LIST_ID>", "clicks": 2, "links": ["https://example.com/october-sale"] }
  ]
}
```

For `bounces`, `complaints` and `unsubscribes`, each entry has just `email`, `name` and `list_id`. `list_id` is the encrypted ID of the list the subscriber is on, as [Get lists](../lists/get-lists.md) returns it.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Invalid type`

Error: `Invalid page`

Error: `Invalid limit`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("type", "clicks");
urlencoded.append("page", "1");
urlencoded.append("limit", "100");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/get-activity.php", requestOptions)
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
  'type': 'clicks',
  'page': '1',
  'limit': '100'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/get-activity.php',
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
