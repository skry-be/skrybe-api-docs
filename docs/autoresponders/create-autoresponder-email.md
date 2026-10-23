---
title: Create autoresponder email
sidebar_label: Create autoresponder email
sidebar_position: 5
---

This method adds an email to one of the brand's autoresponders. The email is created **off**, as the app creates them, unless you pass `enabled=1`, so an integration or agent can draft one for a person to review and turn on.

**URL**  
https://dashboard.skry.be/api/autoresponders/create-autoresponder-email.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `autoresponder_id` the autoresponder's numeric id.
3. `subject` the subject line, up to 500 characters. Personalization tags such as `[Name,fallback=friend]` work.
4. `html_text` the HTML body.
5. `plain_text` the plain text body. (optional)
6. `preheader` preview text shown after the subject in the inbox. (optional)
7. `when` when it goes, relative to signing up for a `drip` or to the date for `annually` and `on_date`: (optional)
    - `drip`: `immediately` (the default), or a delay such as `+3 days`
    - `annually` and `on_date`: `on` (00:00 on the date, the default), or an offset such as `+9 hours` (9am on the date) or `-1 days` (the day before)

    Units are `minutes`, `hours`, `days`, `weeks` or `months`. An offset without a sign is taken as `+`.
8. `from_name`, `from_email`, `reply_to` the sender. Each defaults to the brand's. `from_email` must use one of the brand's sending domains. (optional)
9. `track_opens`, `track_clicks` `0` off, `1` on (the default) or `2` anonymous. (optional)
10. `enabled` `1` to turn the email on now. (optional)

**RESPONSE** (JSON)

Success: the new email, in the same shape as the `email_list` items of [Get autoresponder emails](get-autoresponder-emails).

```json
{
  "id": 89,
  "autoresponder_id": 5,
  "subject": "Happy birthday, [Name,fallback=friend]!",
  "from_name": "Acme Coffee",
  "from_email": "hello@acme.coffee",
  "when": "+9 hours",
  "enabled": false,
  "recipients": 0,
  "created_at": 1792747506
}
```

`when` is `""` for an email that goes on the date itself.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Autoresponder ID not passed`

Error: `Autoresponder does not exist`

Error: `Subject not passed`

Error: `HTML not passed`

Error: `HTML cannot be empty`

Error: `when must be immediately, or a delay such as +3 days`

Error: `when must be on, or an offset such as +9 hours or -1 days`

Error: `A drip email cannot go before signup`

Error: `track_opens and track_clicks must be 0, 1 or 2`

Error: `A field is too long: subject (at most 500 characters)`

Error: `Invalid from_email`

Error: `Invalid reply_to`

Error: `Unauthorised From email domain`

Error: `Unable to create autoresponder email`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("autoresponder_id", "5");
urlencoded.append("subject", "Happy birthday, [Name,fallback=friend]!");
urlencoded.append("html_text", "<h1>Happy birthday!</h1><p>Here is 20% off, on us.</p>");
urlencoded.append("when", "+9 hours");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/autoresponders/create-autoresponder-email.php", requestOptions)
  .then(response => response.text())
  // Success is JSON; errors are plain text
  .then(text => {
    try { console.log(JSON.parse(text)); }
    catch (e) { console.log('error', text); }
  })
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'autoresponder_id': '5',
  'subject': 'Happy birthday, [Name,fallback=friend]!',
  'html_text': '<h1>Happy birthday!</h1><p>Here is 20% off, on us.</p>',
  'when': '+9 hours'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/autoresponders/create-autoresponder-email.php',
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
