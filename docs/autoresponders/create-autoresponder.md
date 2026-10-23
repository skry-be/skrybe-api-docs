---
title: Create autoresponder
sidebar_label: Create autoresponder
sidebar_position: 4
---

This method creates an autoresponder on one of the brand's lists. It starts with no emails; add them with [Create autoresponder email](create-autoresponder-email).

**URL**  
https://dashboard.skry.be/api/autoresponders/create-autoresponder.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the list it belongs to. The encrypted id can be found under **View all lists** in the column named **ID**.
3. `name` its name, up to 100 characters.
4. `type` `drip` (emails sent a set time after someone subscribes), `annually` (sent every year on a date custom field, e.g. birthdays) or `on_date` (sent once, on a date custom field).
5. `custom_field` the list's date custom field an `annually` or `on_date` autoresponder sends on, e.g. `Birthday`. Matched without regard to case. (required for `annually` and `on_date`)

A list can have one `drip` autoresponder, and each date field can drive one autoresponder, as in the app.

**RESPONSE** (JSON)

Success: the new autoresponder, in the same shape as [Get autoresponders](get-autoresponders).

```json
{
  "id": 5,
  "name": "Birthday wishes",
  "type": "annually",
  "list_id": "Vg4f763Kq892Lm0aPz7xYw",
  "custom_field": "Birthday",
  "emails": 0,
  "enabled_emails": 0
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Autoresponder name not passed`

Error: `A field is too long: name (at most 100 characters)`

Error: `type must be drip, annually or on_date`

Error: `List ID not passed`

Error: `List does not exist`

Error: `List already has a drip autoresponder`

Error: `custom_field not passed`

Error: `Field does not exist`

Error: `Field is not a date field`

Error: `Field already has an autoresponder`

Error: `Unable to create autoresponder`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("name", "Birthday wishes");
urlencoded.append("type", "annually");
urlencoded.append("custom_field", "Birthday");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/autoresponders/create-autoresponder.php", requestOptions)
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
  'list_id': '<LIST_ID>',
  'name': 'Birthday wishes',
  'type': 'annually',
  'custom_field': 'Birthday'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/autoresponders/create-autoresponder.php',
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
