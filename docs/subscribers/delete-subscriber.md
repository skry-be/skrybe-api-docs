---
title: Delete subscriber
sidebar_label: Delete subscriber
sidebar_position: 3
---

This method permanently deletes a subscriber from a list. To keep the record but stop sending to it, use [Unsubscribe](./unsubscribe.md) instead.

**URL**  
https://dashboard.skry.be/api/subscribers/delete.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](../lists/get-lists.md).
3. `email` the email address to delete.

**RESPONSE** (Plain text)

Success: `1`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

Error: `Subscriber does not exist`

A `list_id` that can't be decoded is reported as `List ID not passed`. The success response is `1`, not `true`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("email", "jane@example.com");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/subscribers/delete.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'list_id': '<LIST_ID>',
  'email': 'jane@example.com'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/subscribers/delete.php',
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
