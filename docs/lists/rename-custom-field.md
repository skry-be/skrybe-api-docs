---
title: Rename custom field
sidebar_label: Rename custom field
sidebar_position: 7
---

This method renames one of a list's custom fields. Subscribers keep their values, and autoresponders and segment conditions that use the field are updated to the new name. Personalization tags already written into campaigns and templates keep the old name, so update those yourself.

**URL**  
https://dashboard.skry.be/api/lists/rename-custom-field.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](./get-lists.md).
3. `name` the current name of the field (not case-sensitive).
4. `new_name` the new name.

**RESPONSE** (JSON)

Success: the list with its custom fields as they now are, in the same format as [Get list](./get-list.md).

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

Error: `Field name not passed`

Error: `List does not exist`

Error: `Field does not exist`

Error: `Invalid field name`

Error: `Name and Email are built-in fields`

Error: `Field already exists`

Error: `List was changed by another request. Try again.`

:::note Field names
The new name can be up to 100 characters and can't contain any of `: % [ ] , " < >`. `Name` and `Email` are built-in fields and can't be used. Names are compared case-insensitively, so a list can't have both `City` and `city`.
:::

An empty or missing `new_name` is reported as `Invalid field name`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("name", "City");
urlencoded.append("new_name", "Town");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/lists/rename-custom-field.php", requestOptions)
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
  'name': 'City',
  'new_name': 'Town'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/lists/rename-custom-field.php',
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
