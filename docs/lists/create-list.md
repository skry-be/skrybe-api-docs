---
title: Create list
sidebar_label: Create list
sidebar_position: 3
---

This method creates a new list in the brand your API key belongs to. Other list settings (redirect URLs, thank-you and goodbye emails) are set in the app.

**URL**  
https://dashboard.skry.be/api/lists/create.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `name` the name of the list, up to 100 characters.
3. `opt_in` `single` (or `0`) for single opt-in, `double` (or `1`) for double opt-in. Default is `single`. (optional)

**RESPONSE** (JSON)

Success: the new list, in the same format as [Get list](./get-list.md).

```json
{
  "id": "Vg4f763Kq892Lm0aPz7xYw",
  "name": "Newsletter",
  "opt_in": "single",
  "subscribers": {
    "active": 0,
    "unconfirmed": 0,
    "unsubscribed": 0,
    "bounced": 0,
    "complained": 0
  },
  "custom_fields": []
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List name not passed`

Error: `List name is too long`

Error: `opt_in must be single or double`

Error: `Brand does not exist`

Error: `Unable to create list`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("name", "Newsletter");
urlencoded.append("opt_in", "single");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/lists/create.php", requestOptions)
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
  'name': 'Newsletter',
  'opt_in': 'single'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/lists/create.php',
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
