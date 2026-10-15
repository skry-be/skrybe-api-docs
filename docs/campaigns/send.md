---
title: Send a campaign
sidebar_label: Send
sidebar_position: 8
---

This method sends an existing draft to the lists and/or segments you choose, like **Send now** in the dashboard. The campaign is marked as sending straight away and delivery starts on the next run of the sending job. The campaign and every list and segment must belong to the brand your API key belongs to.

It's safe to retry: only a draft can be sent, so repeating a request that already went through returns `Campaign has already been sent` instead of sending twice.

Before anything is sent, Skrybe checks that the campaign's From email domain is allowed for the brand and verified, that the brand isn't under review, that there is at least one active subscriber to send to, and that the send fits in the brand's sending quota. Use `dry_run` to run all of these checks and get the recipient count without sending.

**URL**  
https://dashboard.skry.be/api/campaigns/send.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the draft to send.
3. `list_ids` encrypted list IDs, single or comma-separated, as [Get lists](../lists/get-lists.md) returns them. Required unless `segment_ids` is passed.
4. `segment_ids` segment IDs (whole numbers), single or comma-separated. Required unless `list_ids` is passed.
5. `exclude_list_ids` encrypted list IDs to exclude, single or comma-separated. (optional)
6. `exclude_segment_ids` segment IDs to exclude, single or comma-separated. (optional)
7. `dry_run` set to `1`, `yes` or `true` to run every check and count the recipients without sending. (optional)

Recipients are the unique, active (subscribed, confirmed, not bounced, not complained) subscribers in the chosen lists and segments, minus anyone in the excluded ones. If the brand sends to GDPR-consenting subscribers only, only those are counted.

**RESPONSE** (JSON)

On success you get a JSON object. `recipients` is the number of emails that will be sent. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{"status":"sending","campaign_id":1234,"recipients":5120}
```

With `dry_run`:

```json
{"status":"dry_run","campaign_id":1234,"recipients":5120}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `List or segment ID(s) not passed`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Campaign is scheduled` (use [Unschedule](./unschedule.md) first, or let it send at its scheduled time)

Error: `Campaign has already been sent` (the campaign isn't a draft)

Error: `One or more list IDs are invalid` (also returned for an invalid `exclude_list_ids` entry)

Error: `One or more segment IDs are invalid` (also returned for an invalid `exclude_segment_ids` entry)

Error: `Unauthorised From email domain`

Error: `Domain "<domain>" is not verified in SES. Full domain verification is required to send emails.`

Error: `Account under review: <reason>. Sending is disabled.`

Error: `Unable to count recipients`

Error: `No active subscribers to send to`

Error: `Error: This campaign would exceed your monthly sending allowance. Reduce the recipients, or renew your plan to send more.`

Error: `Error: This campaign would exceed your sending quota. Reduce the recipients or increase your quota, then try again.`

Error: `Unable to send campaign`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("list_ids", "<YOUR_LIST_ID>");
urlencoded.append("exclude_list_ids", "<LIST_ID_TO_EXCLUDE>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/send.php", requestOptions)
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
  'list_ids': '<YOUR_LIST_ID>',
  'exclude_list_ids': '<LIST_ID_TO_EXCLUDE>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/send.php',
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
