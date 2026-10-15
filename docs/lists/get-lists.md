---
title: Get lists
sidebar_label: Get lists
sidebar_position: 1
---

This method returns the ids and names of the lists in the brand your API key belongs to. To see a list's subscriber counts and custom fields, use [Get list](./get-list.md).

**URL**  
https://dashboard.skry.be/api/lists/get-lists.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `include_hidden` set to `yes` (or `true`) to also return lists that are hidden. Default is `no`. (optional)

**RESPONSE** (JSON)

Success: a JSON object with one entry per list, keyed `list1`, `list2`, and so on. Lists are sorted by name, or newest first if the brand sorts templates and lists by date.

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

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `No lists found`

`Brand does not exist` is returned when the key isn't tied to a brand, for example the main account's key.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("include_hidden", "no");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/lists/get-lists.php", requestOptions)
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
  'include_hidden': 'no'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/lists/get-lists.php',
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
