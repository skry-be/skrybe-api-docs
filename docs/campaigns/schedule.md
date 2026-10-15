---
title: Schedule a campaign
sidebar_label: Schedule
sidebar_position: 9
---

This method schedules a draft to send later, or reschedules a campaign that is already scheduled, like **Schedule this campaign** in the dashboard. The campaign and every list and segment must belong to the brand your API key belongs to.

The recipients are reserved against the brand's sending quota when you schedule. Rescheduling charges or refunds only the difference, and [unscheduling](./unschedule.md) or [deleting](./delete.md) the campaign before it goes out hands the reservation back.

Scheduling runs the same checks as [Send](./send.md): the From email domain must be allowed for the brand and verified, the brand must not be under review, there must be at least one active subscriber, and the recipients must fit in the quota. Use `dry_run` to run them without scheduling.

**URL**  
https://dashboard.skry.be/api/campaigns/schedule.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `campaign_id` the ID of the draft or scheduled campaign.
3. `schedule_date_time` when to send, eg. `June 15, 2027 6:05pm` or `2027-06-15 18:05`. Any format PHP's `strtotime()` understands is accepted. Must be in the future.
4. `schedule_timezone` the timezone `schedule_date_time` is in, eg. `America/New_York`. See the list of PHP's supported timezones. Defaults to your account's timezone. (optional)
5. `list_ids` encrypted list IDs, single or comma-separated, as [Get lists](../lists/get-lists.md) returns them. Required unless `segment_ids` is passed.
6. `segment_ids` segment IDs (whole numbers), single or comma-separated. Required unless `list_ids` is passed.
7. `exclude_list_ids` encrypted list IDs to exclude, single or comma-separated. (optional)
8. `exclude_segment_ids` segment IDs to exclude, single or comma-separated. (optional)
9. `dry_run` set to `1`, `yes` or `true` to run every check and count the recipients without scheduling. (optional)

Rescheduling replaces the time and the recipients, so pass the lists and segments again.

**RESPONSE** (JSON)

On success you get a JSON object. `scheduled_at` is the send time as a Unix timestamp, `recipients` the number of emails reserved. Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{"status":"scheduled","campaign_id":1234,"recipients":5120,"scheduled_at":1813097100,"timezone":"America/New_York"}
```

With `dry_run`, `status` is `dry_run` and nothing is scheduled:

```json
{"status":"dry_run","campaign_id":1234,"recipients":5120,"scheduled_at":1813097100,"timezone":"America/New_York"}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Campaign ID not passed`

Error: `List or segment ID(s) not passed`

Error: `schedule_date_time not passed`

Error: `Brand does not exist`

Error: `schedule_timezone is invalid`

Error: `schedule_date_time is invalid`

Error: `schedule_date_time is in the past`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Campaign has already been sent` (the campaign is preparing, sending, sent or paused)

Error: `One or more list IDs are invalid` (also returned for an invalid `exclude_list_ids` entry)

Error: `One or more segment IDs are invalid` (also returned for an invalid `exclude_segment_ids` entry)

Error: `Unauthorised From email domain`

Error: `Domain "<domain>" is not verified in SES. Full domain verification is required to send emails.`

Error: `Account under review: <reason>. Sending is disabled.`

Error: `Unable to count recipients`

Error: `No active subscribers to send to`

Error: `Error: This campaign would exceed your monthly sending allowance. Reduce the recipients, or renew your plan to send more.`

Error: `Error: This campaign would exceed your sending quota. Reduce the recipients or increase your quota, then try again.`

Error: `Unable to schedule campaign`

Error: `Campaign was changed by another request. Try again.`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("schedule_date_time", "June 15, 2027 6:05pm");
urlencoded.append("schedule_timezone", "America/New_York");
urlencoded.append("list_ids", "<YOUR_LIST_ID>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/schedule.php", requestOptions)
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
  'schedule_date_time': 'June 15, 2027 6:05pm',
  'schedule_timezone': 'America/New_York',
  'list_ids': '<YOUR_LIST_ID>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/schedule.php',
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
