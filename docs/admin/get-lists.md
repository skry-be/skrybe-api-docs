---
title: Get lists (admin)
sidebar_label: Get lists
sidebar_position: 3
---

This method returns the ids and names of the lists of any brand in the account.

**URL**  
https://dashboard.skry.be/api/admin/lists/get-lists.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key. Brand keys are rejected with `Invalid API key`.
2. `brand_id` the numeric id of the brand, as returned by [Get brands (admin)](./get-brands.md).
3. `include_hidden` accepted for compatibility with [Get lists](../lists/get-lists.md), but this endpoint currently returns hidden lists whatever its value. (optional)

**RESPONSE** (JSON)

Success: a JSON object with one entry per list, keyed `list1`, `list2`, and so on, in the same format as [Get lists](../lists/get-lists.md). Lists are sorted by name, or newest first if the brand sorts templates and lists by date.

```json
{
  "list1": {
    "id": "Vg4f763Kq892Lm0aPz7xYw",
    "name": "Customers"
  },
  "list2": {
    "id": "p3Rt892bN763cXw1ZqLk0A",
    "name": "Newsletter"
  }
}
```

Error: `No data passed`

Error: `Invalid API key`

Error: `Brand ID not passed`

Error: `Brand does not exist`

Error: `No lists found`

A request without `api_key` gets `No data passed`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<MAIN_ACCOUNT_API_KEY>");
urlencoded.append("brand_id", "<BRAND_ID>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/admin/lists/get-lists.php", requestOptions)
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
  'api_key': '<MAIN_ACCOUNT_API_KEY>',
  'brand_id': '<BRAND_ID>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/admin/lists/get-lists.php',
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
