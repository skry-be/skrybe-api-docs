---
title: Delete list
sidebar_label: Delete list
sidebar_position: 5
---

This method permanently deletes a list together with its subscribers, autoresponders, segments and rules, the same as deleting it in the app.

**URL**  
https://dashboard.skry.be/api/lists/delete.php

**PARAMETERS**(POST)  

:::danger
This can't be undone.
:::

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](./get-lists.md).

**RESPONSE** (JSON)

Success:

```json
{
  "id": "Vg4f763Kq892Lm0aPz7xYw",
  "deleted": true
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

Error: `List is used by a scheduled or sending campaign`

Error: `Unable to delete list`

Unlike the app, the API refuses to delete a list that a scheduled campaign, or a campaign that is still sending, is going to or excluding (`List is used by a scheduled or sending campaign`). Unschedule the campaign or wait for it to finish first.

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

fetch("https://dashboard.skry.be/api/lists/delete.php", requestOptions)
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
  url: 'https://dashboard.skry.be/api/lists/delete.php',
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
