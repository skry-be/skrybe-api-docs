---
title: Create campaign (admin)
sidebar_label: Create campaign
sidebar_position: 4
---

This method creates a campaign for any brand in the account, and can also send or schedule it. It takes the same parameters as [Create campaign](../campaigns/create.md), plus `brand_id` for drafts and `json` to get the new draft's id.

**URL**  
https://dashboard.skry.be/api/admin/campaigns/create.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key. Brand keys are rejected with `Invalid API key`.
2. `from_name` the 'From name' of your campaign
3. `from_email` the 'From email' of your campaign. When the campaign is sent or scheduled, its domain must be one of the brand's allowed sending domains.
4. `reply_to` the 'Reply to' of your campaign
5. `title` the 'Title' of your campaign (optional)
6. `subject` the 'Subject' of your campaign
7. `plain_text` the 'Plain text version' of your campaign (optional)
8. `html_text` the 'HTML version' of your campaign
9. `list_ids` required only if you set `send_campaign` to 1 and pass no `segment_ids`. Encrypted list ids, single or comma-separated.
10. `segment_ids` required only if you set `send_campaign` to 1 and pass no `list_ids`. Segment ids, single or comma-separated.
11. `exclude_list_ids` lists to exclude, single or comma-separated (optional)
12. `exclude_segments_ids` segments to exclude, single or comma-separated (optional)
13. `brand_id` the numeric id of the brand, as returned by [Get brands (admin)](./get-brands.md). Required when `send_campaign` is 0 (including when scheduling). When the campaign is sent or scheduled, the brand is taken from its lists and segments, which must all belong to one brand.
14. `query_string` eg. Google Analytics tags (optional)
15. `track_opens` 0 to disable, 1 to enable, 2 for anonymous opens tracking. Default is 1. (optional)
16. `track_clicks` 0 to disable, 1 to enable, 2 for anonymous clicks tracking. Default is 1. (optional)
17. `send_campaign` set to 1 to send the campaign now rather than just creating a draft. Default is 0. (optional)
18. `schedule_date_time` schedules the campaign for this date and time, eg. `June 15, 2021 6:05pm`. (optional)
19. `schedule_timezone` the timezone of `schedule_date_time`, eg. `America/New_York`. Defaults to the main account's timezone. (optional)
20. `json` set to 1 to get a JSON response with the new campaign's id. Only applies to drafts. (optional)

**RESPONSE** (Plain text)

Success: `Campaign created`

Success (draft with `json=1`): `{"status":"Campaign created", "campaign_id": "123"}`

Success: `Campaign created and now sending`

Success: `Campaign scheduled`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `From name not passed`

Error: `From email not passed`

Error: `Reply to email not passed`

Error: `Subject not passed`

Error: `HTML not passed`

Error: `List or segment ID(s) not passed`

Error: `Brand ID not passed.`

Error: `One or more list IDs are invalid`

Error: `One or more segment IDs are invalid`

Error: `List or segment IDs does not belong to a single brand`

Error: `Unauthorised From email domain`

Error: `schedule_date_time is invalid`

Error: `Unable to calculate totals`

Error: `Unable to create campaign`

Error: `Unable to create and send campaign`

Error: `Unable to schedule campaign`

`Brand ID not passed.` ends with a full stop on this endpoint. Drafts are not checked against the brand's allowed sending domains; sends and schedules are.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<MAIN_ACCOUNT_API_KEY>");
urlencoded.append("brand_id", "<BRAND_ID>");
urlencoded.append("from_name", "Acme");
urlencoded.append("from_email", "news@acme.com");
urlencoded.append("reply_to", "hello@acme.com");
urlencoded.append("title", "May newsletter");
urlencoded.append("subject", "What's new in May");
urlencoded.append("html_text", "<html><body><h1>Hello</h1></body></html>");
urlencoded.append("json", "1");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/admin/campaigns/create.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<MAIN_ACCOUNT_API_KEY>',
  'brand_id': '<BRAND_ID>',
  'from_name': 'Acme',
  'from_email': 'news@acme.com',
  'reply_to': 'hello@acme.com',
  'title': 'May newsletter',
  'subject': 'What\'s new in May',
  'html_text': '<html><body><h1>Hello</h1></body></html>',
  'json': '1'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/admin/campaigns/create.php',
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
