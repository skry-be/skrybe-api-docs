---
title: Send Individual Emails
sidebar_label: Send
sidebar_position: 1
---

This method sends an email to a set of addresses you pass in, or schedules it. Behind the scenes it creates a campaign in the brand your API key belongs to (it appears in your dashboard with the subject as its title). Unless you pass `list_ids`, the addresses are added to a new list named `API Send - <date and time>` and the campaign is sent to that list.

Before anything is created, Skrybe checks the brand's sending quota, that the `from_email` domain is one of the brand's allowed From domains and is verified, and that the brand isn't under review.

**URL**  
https://dashboard.skry.be/api/emails/send.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `from_name` the 'From name' of your email
3. `from_email` the 'From email' of your email. Its domain must be allowed for the brand.
4. `reply_to` the 'Reply to' of your email
5. `subject` the 'Subject' of your email (also used as the campaign title in your dashboard)
6. `plain_text` the 'Plain text version' of your email (optional)
7. `html_text` the 'HTML version' of your email
8. `to` a JSON-encoded array of email addresses, eg. `["user@example.com","user2@example.com"]`. At most 250 addresses per request. Required, even when you pass `list_ids`.
9. `recipient-variables` a JSON-encoded object with per-recipient values, keyed by email address. Format: `{"user@example.com": {"first":"John", "id":1}, "user2@example.com": {"first":"Jane", "id":2}}`. Each key becomes a custom field on the new list, so you can use it in your email like any custom field's personalization tag, eg. `[first,fallback=there]`. Only used when no `list_ids` are passed. (optional)
10. `list_ids` send to these existing lists instead of creating a new one. Single or comma-separated. Use the encrypted ids returned by [Get lists](../lists/get-lists.md) (numeric list ids are also accepted). Every list must belong to the brand. (optional)
11. `segment_ids` also send to these segments. Single or comma-separated numeric segment ids, which can be found in the segments setup page; every segment must belong to the brand. (optional)
12. `exclude_list_ids` lists whose subscribers are left out, in the same format as `list_ids`. (optional)
13. `exclude_segments_ids` segments whose subscribers are left out, in the same format as `segment_ids`. (optional)
14. `query_string` eg. Google Analytics tags (optional)
15. `track_opens` Set to 0 to disable, 1 to enable and 2 for anonymous opens tracking. Default is 1.
16. `track_clicks` Set to 0 to disable, 1 to enable and 2 for anonymous clicks tracking. Default is 1.
17. `schedule_date_time` Email will be scheduled if a date/time is passed, eg. `June 15, 2027 6:05pm` or `2027-06-15 18:05`. Anything PHP's `strtotime()` understands is accepted. The email goes out at that time in `schedule_timezone`. (optional)
18. `schedule_timezone` Eg. `America/New_York`. See the list of PHP's supported timezones. This parameter only applies if you're scheduling your email with `schedule_date_time`. Skrybe will use your default timezone if this parameter is empty.

The number of addresses in `to` is what's checked against, and charged to, the brand's sending quota.

**RESPONSE** (JSON)

Every response is JSON. Success returns HTTP status 200 with the ID of the campaign that was created:

```json
{
  "ok": true,
  "message": "Campaign created and now sending",
  "data": { "campaign_id": 1234 },
  "timestamp": "2026-10-15 14:03:11"
}
```

When `schedule_date_time` is passed, `message` is `Campaign scheduled`.

Errors return `ok: false` and an `error` message, with an HTTP error status:

```json
{
  "ok": false,
  "error": "Subject not passed",
  "timestamp": "2026-10-15 14:03:11"
}
```

Error (400): `No data passed`

Error (400): `API key not passed`

Error (400): `Invalid API key`

Error (429): `Too many failed attempts. Try again later.` (after 10 failed API key attempts from your IP address within 15 minutes, it is blocked for 15 minutes)

Error (400): `From name not passed`

Error (400): `From email not passed`

Error (400): `Reply to email not passed`

Error (400): `Subject not passed`

Error (400): `HTML not passed`

Error (400): `No recipient emails provided` (also returned when `to` isn't valid JSON)

Error (400): `Maximum 250 recipients per API request.`

Error (400): `Invalid email address format`

Error (400): `schedule_timezone is invalid`

Error (400): `schedule_date_time is invalid`

Error (402): `Subscription expired or monthly quota exceeded`

Error (400): `Unauthorised From email domain`

Error (400): `Domain "<domain>" is not verified in SES. Full domain verification is required.`

Error (403): `Account under review: <reason>. Sending is disabled.`

Error (400): `One or more list IDs are invalid` (a list id that is unknown, can't be decoded, or belongs to another brand, in `list_ids` or `exclude_list_ids`)

Error (400): `One or more segment IDs are invalid`

Error (500): `Unable to create campaign: <database error>`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("from_name", "Mayo");
urlencoded.append("from_email", "contact@example.com");
urlencoded.append("reply_to", "contact@example.com");
urlencoded.append("subject", "Q4 Newsletter");
urlencoded.append("html_text", "<html><body>Hello [first,fallback=there]!</body></html>");
urlencoded.append("to", JSON.stringify(["user@example.com", "user2@example.com"]));
urlencoded.append("recipient-variables", JSON.stringify({
  "user@example.com": {"first": "John"},
  "user2@example.com": {"first": "Jane"}
}));
urlencoded.append("track_opens", "1");
urlencoded.append("track_clicks", "1");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/emails/send.php", requestOptions)
  .then(response => response.json())
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
  'subject': 'Q4 Newsletter',
  'html_text': '<html><body>Hello [first,fallback=there]!</body></html>',
  'to': JSON.stringify(['user@example.com', 'user2@example.com']),
  'recipient-variables': JSON.stringify({
    'user@example.com': { 'first': 'John' },
    'user2@example.com': { 'first': 'Jane' }
  }),
  'track_opens': '1',
  'track_clicks': '1'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/emails/send.php',
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
  // Error responses use HTTP error statuses; the JSON body is in error.response.data
  console.log(error.response ? error.response.data : error);
});
```
