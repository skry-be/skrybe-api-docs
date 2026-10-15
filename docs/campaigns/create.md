---
title: Create and send campaigns
sidebar_label: Create
sidebar_position: 1
---

This method creates a campaign in the brand your API key belongs to. By default it saves a draft; it can also send the campaign straight away (`send_campaign=1`) or schedule it (`schedule_date_time`). To send or schedule a draft you created earlier, use [Send](./send.md) or [Schedule](./schedule.md) instead.

:::info Brand scoping
The campaign is always created in the brand tied to your API key. When sending or scheduling, every list and segment you pass must belong to that same brand, and the `from_email` domain must be one of the brand's allowed From domains.
:::

**URL**  
https://dashboard.skry.be/api/campaigns/create.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `from_name` the 'From name' of your campaign
3. `from_email` the 'From email' of your campaign
4. `reply_to` the 'Reply to' of your campaign
5. `title` the 'Title' (dashboard label) of your campaign (optional)
6. `subject` the 'Subject' of your campaign
7. `plain_text` the 'Plain text version' of your campaign (optional)
8. `html_text` the 'HTML version' of your campaign
9. `list_ids` List IDs, single or comma-separated. Use the encrypted IDs shown under **View all lists** in the **ID** column (the same IDs [Get lists](../lists/get-lists.md) returns). Required when sending or scheduling, unless `segment_ids` is passed.
10. `segment_ids` Segment IDs (whole numbers), single or comma-separated. Segment IDs can be found in the segments setup page. Required when sending or scheduling, unless `list_ids` is passed.
11. `exclude_list_ids` Lists to exclude from your campaign. Encrypted list IDs, single or comma-separated. (optional)
12. `exclude_segments_ids` Segments to exclude from your campaign. Segment IDs, single or comma-separated. (optional)
13. `query_string` eg. Google Analytics tags (optional)
14. `track_opens` Set to 0 to disable, 1 to enable and 2 for anonymous opens tracking. Default is 1.
15. `track_clicks` Set to 0 to disable, 1 to enable and 2 for anonymous clicks tracking. Default is 1.
16. `send_campaign` Set to 1 if you want to send the campaign as well and not just create a draft. Default is 0.
17. `schedule_date_time` Campaign will be scheduled if a valid date/time is passed, eg. `June 15, 2027 6:05pm`. Any format PHP's `strtotime()` understands is accepted.
18. `schedule_timezone` Eg. `America/New_York`. See the list of PHP's supported timezones. This parameter only applies if you're scheduling your campaign with `schedule_date_time`. Skrybe will use your default timezone if this parameter is empty.
19. `json` Set to 1 to get a JSON response containing the new campaign's ID. Only applies when creating a draft (no `send_campaign`, no `schedule_date_time`). (optional)

List and segment IDs are only checked when you send or schedule; a draft doesn't store recipients. You pick them when you [send](./send.md) or [schedule](./schedule.md) the draft.

**RESPONSE** (Plain text)

Every response is returned with HTTP status 200, so check the body.

Success: `Campaign created`

Success (draft with `json=1`):

```json
{"status":"Campaign created", "campaign_id": "1234"}
```

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

Error: `Brand ID not passed.` (the API key isn't tied to a brand)

Error: `One or more list IDs are invalid` (also returned for an invalid `exclude_list_ids` entry)

Error: `One or more segment IDs are invalid` (also returned for an invalid `exclude_segments_ids` entry)

Error: `Unauthorised From email domain`

Error: `schedule_date_time is invalid`

Error: `Unable to calculate totals`

Error: `Unable to create campaign`

Error: `Unable to create and send campaign`

Error: `Unable to schedule campaign`

:::note Rate limit
After 10 failed API key attempts within 15 minutes, requests from your IP address are blocked for 15 minutes. While blocked, every request gets `Invalid API key`, even with a valid key.
:::

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("from_name", "Mayo");
urlencoded.append("from_email", "contact@example.com");
urlencoded.append("reply_to", "contact@example.com");
urlencoded.append("title", "October newsletter");
urlencoded.append("subject", "What's new this October");
urlencoded.append("html_text", "<html><body>Hello there!</body></html>");
urlencoded.append("list_ids", "<YOUR_LIST_ID>");
urlencoded.append("track_opens", "1");
urlencoded.append("track_clicks", "1");
urlencoded.append("send_campaign", "1");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/create.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'from_name': 'Mayo',
  'from_email': 'contact@example.com',
  'reply_to': 'contact@example.com',
  'title': 'October newsletter',
  'subject': 'What\'s new this October',
  'html_text': '<html><body>Hello there!</body></html>',
  'list_ids': '<YOUR_LIST_ID>',
  'track_opens': '1',
  'track_clicks': '1',
  'send_campaign': '1' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/create.php',
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
