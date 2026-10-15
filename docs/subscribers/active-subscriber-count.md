---
title: Active subscriber count
sidebar_label: Active subscriber count
sidebar_position: 5
---

This method gets the number of active subscribers in a list: confirmed, and not unsubscribed, bounced or marked as spam. That's who a campaign to the list is sent to.

**URL**  
https://dashboard.skry.be/api/subscribers/active-subscriber-count.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](../lists/get-lists.md).

**RESPONSE** (Plain text)

Success: the number of active subscribers, eg. `1520`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

A list that belongs to another brand is reported as `List does not exist`. A key that isn't tied to a brand (the main account's key) gets `Invalid API key`.

A `list_id` that can't be decoded is reported as `List ID not passed`.

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

fetch("https://dashboard.skry.be/api/subscribers/active-subscriber-count.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
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
  url: 'https://dashboard.skry.be/api/subscribers/active-subscriber-count.php',
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
