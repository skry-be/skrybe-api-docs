---
title: Get a campaign
sidebar_label: Get campaign
sidebar_position: 3
---

This method returns one campaign's details: its settings, recipients and status, and optionally its HTML and plain text content. The campaign must belong to the brand your API key belongs to.

**URL**  
https://dashboard.skry.be/api/campaigns/get-campaign.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the campaign's ID, as returned by [Get campaigns](./get-campaigns.md).
3. `include_content` set to `yes` or `true` to also return `html_text` and `plain_text`. (optional)

**RESPONSE** (JSON)

On success you get the campaign as a JSON object. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "id": 1234,
  "title": "October newsletter",
  "subject": "What's new this October",
  "status": "scheduled",
  "from_name": "Mayo",
  "from_email": "contact@example.com",
  "reply_to": "contact@example.com",
  "recipients": 0,
  "to_send": 0,
  "sent_at": null,
  "scheduled_at": 1763978400,
  "timezone": "America/New_York",
  "source": "api",
  "preheader": "Our biggest update of the year",
  "query_string": "utm_source=skrybe&utm_medium=email",
  "track_opens": 1,
  "track_clicks": 1,
  "list_ids": ["<ENCRYPTED_LIST_ID>"],
  "exclude_list_ids": [],
  "segment_ids": [12],
  "exclude_segment_ids": [],
  "web_version": "https://dashboard.skry.be/w/<ENCRYPTED_CAMPAIGN_ID>",
  "html_text": "<html><body>Hello there!</body></html>",
  "plain_text": "Hello there!"
}
```

The first fields are the same as in [Get campaigns](./get-campaigns.md). In addition:

- `preheader` the preview text shown in the inbox
- `track_opens` / `track_clicks` 0 (off), 1 (on) or 2 (anonymous)
- `list_ids` / `exclude_list_ids` encrypted list IDs, as [Get lists](../lists/get-lists.md) returns them. Empty for a draft, which doesn't store recipients yet.
- `segment_ids` / `exclude_segment_ids` segment IDs
- `web_version` the link to the campaign's web version
- `html_text` / `plain_text` only present when `include_content` is set

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
urlencoded.append("include_content", "yes");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/get-campaign.php", requestOptions)
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
  'include_content': 'yes'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/get-campaign.php',
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
