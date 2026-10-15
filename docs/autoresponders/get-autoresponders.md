---
title: Get autoresponders
sidebar_label: Get autoresponders
sidebar_position: 1
---

This method returns the autoresponders of the brand your API key belongs to, or of one of its lists. Autoresponders are read-only through the API; create and edit them in the app.

**URL**  
https://dashboard.skry.be/api/autoresponders/get-autoresponders.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` only return the autoresponders of this list. The encrypted id can be found under **View all lists** in the column named **ID**. (optional)

**RESPONSE** (JSON)

Success:

```json
{
  "autoresponders": [
    {
      "id": 3,
      "name": "Welcome series",
      "type": "drip",
      "list_id": "Vg4f763Kq892Lm0aPz7xYw",
      "custom_field": null,
      "emails": 3,
      "enabled_emails": 2
    },
    {
      "id": 5,
      "name": "Birthday wishes",
      "type": "annually",
      "list_id": "Vg4f763Kq892Lm0aPz7xYw",
      "custom_field": "Birthday",
      "emails": 1,
      "enabled_emails": 1
    }
  ]
}
```

- `id` the autoresponder's numeric id
- `name` its name
- `type` `drip` (emails sent a set time after someone subscribes), `annually` (sent every year on a date custom field) or `on_date` (sent once, on a date custom field)
- `list_id` the encrypted id of the list it belongs to
- `custom_field` the date custom field an `annually` or `on_date` autoresponder sends on; `null` for `drip`
- `emails` how many emails it has, and `enabled_emails` how many of those are enabled

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `List does not exist`

`List does not exist` is returned when `list_id` isn't one of the brand's lists.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/autoresponders/get-autoresponders.php", requestOptions)
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
  'list_id': '<LIST_ID>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/autoresponders/get-autoresponders.php',
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
