---
title: Update a campaign
sidebar_label: Update
sidebar_position: 4
---

This method edits a campaign that hasn't started sending yet: a draft or a scheduled campaign. Only the fields you pass are changed; everything else is left as it is. The campaign must belong to the brand your API key belongs to.

To change a scheduled campaign's time or recipients, use [Schedule](./schedule.md) again.

**URL**  
https://dashboard.skry.be/api/campaigns/update-campaign.php

**PARAMETERS**(POST)  

Pass `api_key`, `campaign_id` and at least one of the other fields.

1. `api_key` your API key.
2. `campaign_id` the ID of the campaign to update.
3. `title` the 'Title' (dashboard label), at most 500 characters. (optional)
4. `subject` the 'Subject', at most 500 characters. Can't be empty. (optional)
5. `preheader` the preview text shown in the inbox, at most 255 characters. (optional)
6. `from_name` the 'From name', at most 100 characters. (optional)
7. `from_email` the 'From email', at most 100 characters. Must be a valid email address on one of the brand's allowed From domains. (optional)
8. `reply_to` the 'Reply to' email, at most 100 characters. Must be a valid email address. (optional)
9. `html_text` the 'HTML version'. Can't be empty. (optional)
10. `plain_text` the 'Plain text version'. (optional)
11. `query_string` eg. Google Analytics tags, at most 500 characters. (optional)
12. `track_opens` 0 to disable, 1 to enable and 2 for anonymous opens tracking. (optional)
13. `track_clicks` 0 to disable, 1 to enable and 2 for anonymous clicks tracking. (optional)

Changing the `from_email` of a scheduled campaign runs the same checks as scheduling it: the domain must be allowed for the brand and verified, and the brand must not be under review.

**RESPONSE** (JSON)

On success you get the updated campaign as a JSON object, in the same shape as [Get campaign](./get-campaign.md) (without `html_text` and `plain_text`). Errors are returned as plain text. Every response is returned with HTTP status 200.

```json
{
  "id": 1234,
  "title": "October newsletter",
  "subject": "What's new this October (updated)",
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

Error: `Nothing to update`

Error: `Subject cannot be empty`

Error: `HTML cannot be empty`

Error: `Invalid from_email`

Error: `Invalid reply_to`

Error: `A field is too long: <field> (at most <n> characters)`, eg. `A field is too long: subject (at most 500 characters)`

Error: `track_opens and track_clicks must be 0, 1 or 2`

Error: `Brand does not exist`

Error: `Campaign does not exist` (also returned for a campaign in another brand)

Error: `Campaign has already been sent` (the campaign is preparing, sending, sent or paused)

Error: `Unauthorised From email domain`

Error: `Domain "<domain>" is not verified in SES. Full domain verification is required to send emails.` (scheduled campaigns only)

Error: `Account under review: <reason>. Sending is disabled.` (scheduled campaigns only)

Error: `Unable to update campaign`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("campaign_id", "1234");
urlencoded.append("subject", "What's new this October (updated)");
urlencoded.append("preheader", "Our biggest update of the year");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/update-campaign.php", requestOptions)
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
  'subject': 'What\'s new this October (updated)',
  'preheader': 'Our biggest update of the year'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/update-campaign.php',
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
