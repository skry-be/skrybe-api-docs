---
title: Duplicate a campaign
sidebar_label: Duplicate
sidebar_position: 5
---

This method copies a campaign, sent or not, into a new draft in the same brand, just like **Duplicate** in the dashboard. The content, sender details, preview text, query string and tracking settings are copied. Recipients, schedule and stats are not. The campaign must belong to the brand your API key belongs to.

**URL**  
https://dashboard.skry.be/api/campaigns/duplicate-campaign.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the campaign to copy.
3. `title` the 'Title' (dashboard label) of the copy, at most 500 characters. Defaults to the original's title. (optional)

**RESPONSE** (JSON)

On success you get the new draft as a JSON object, in the same shape as [Get campaign](./get-campaign.md) (without `html_text` and `plain_text`). Its `id` is the new campaign's ID. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "id": 1240,
  "title": "October newsletter (resend)",
  "subject": "What's new this October",
  "status": "draft",
  "from_name": "Mayo",
  "from_email": "contact@example.com",
  "reply_to": "contact@example.com",
  "recipients": 0,
  "to_send": 0,
  "sent_at": null,
  "scheduled_at": null,
  "timezone": null,
  "source": "api",
  "preheader": "Our biggest update of the year",
  "query_string": "",
  "track_opens": 1,
  "track_clicks": 1,
  "list_ids": [],
  "exclude_list_ids": [],
  "segment_ids": [],
  "exclude_segment_ids": [],
  "web_version": "https://dashboard.skry.be/w/<ENCRYPTED_CAMPAIGN_ID>"
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `Title is too long`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Unable to duplicate campaign`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("title", "October newsletter (resend)");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/duplicate-campaign.php", requestOptions)
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
  'title': 'October newsletter (resend)'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/duplicate-campaign.php',
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
