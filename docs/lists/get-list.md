---
title: Get list
sidebar_label: Get list
sidebar_position: 2
---

This method returns one list: its name, opt-in type, how many subscribers it has in each state, and its custom fields. This is how you find out which custom fields a list has (and their exact names) before you pass them to [Subscribe](../subscribers/subscribe.md).

**URL**  
https://dashboard.skry.be/api/lists/get-list.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](./get-lists.md).

**RESPONSE** (JSON)

Success:

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

- `id` the list's encrypted id
- `name` the list's name
- `opt_in` `single` or `double`
- `subscribers` how many subscribers are in each state. Every subscriber is counted in exactly one state, so the five numbers add up to the list's total: a complaint outranks a bounce, which outranks an unsubscribe, which outranks being unconfirmed. `active` is exactly who a campaign sends to (the same number as [Active subscriber count](../subscribers/active-subscriber-count.md)).
- `custom_fields` the list's custom fields in order, each with its `name` and `type` (`Text` or `Date`)

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

A list that belongs to another brand is reported as `List does not exist`.

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

fetch("https://dashboard.skry.be/api/lists/get-list.php", requestOptions)
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
  url: 'https://dashboard.skry.be/api/lists/get-list.php',
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
