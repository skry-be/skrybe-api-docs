---
title: Update list
sidebar_label: Update list
sidebar_position: 4
---

This method renames a list, or switches it between single and double opt-in. Pass at least one of `name` and `opt_in`; whatever you leave out stays as it is.

**URL**  
https://dashboard.skry.be/api/lists/update-list.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](./get-lists.md).
3. `name` the new name of the list, up to 100 characters. (optional)
4. `opt_in` `single` (or `0`) or `double` (or `1`). (optional)

**RESPONSE** (JSON)

Success: the updated list, in the same format as [Get list](./get-list.md).

```json
{
  "id": "Vg4f763Kq892Lm0aPz7xYw",
  "name": "Newsletter",
  "opt_in": "single",
  "subscribers": {
    "active": 1520,
    "unconfirmed": 12,
    "unsubscribed": 87,
    "bounced": 9,
    "complained": 1
  },
  "custom_fields": [
    {
      "name": "Birthday",
      "type": "Date"
    },
    {
      "name": "City",
      "type": "Text"
    }
  ]
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `Nothing to update`

Error: `List name is too long`

Error: `opt_in must be single or double`

Error: `List does not exist`

Error: `Unable to update list`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("name", "Weekly newsletter");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/lists/update-list.php", requestOptions)
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
  'name': 'Weekly newsletter'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/lists/update-list.php',
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
