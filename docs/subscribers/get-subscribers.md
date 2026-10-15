---
title: Get subscribers
sidebar_label: Get subscribers
sidebar_position: 6
---

This method returns a page of a list's subscribers, optionally only those in one state. Subscribers are returned oldest first, so paging through a list stays stable while people keep joining it.

**URL**  
https://dashboard.skry.be/api/subscribers/get-subscribers.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the encrypted id of the list. It can be found under **View all lists** in the column named **ID**, or in the `id` returned by [Get lists](../lists/get-lists.md).
3. `status` only return subscribers in this state: `active`, `unconfirmed`, `unsubscribed`, `bounced` or `complained`. Returns every state if left out. (optional)
4. `page` the page to return, starting at `1`. Default is `1`. (optional)
5. `limit` how many subscribers per page, from `1` to `1000`. Default is `100`. (optional)

**RESPONSE** (JSON)

Success:

```json
{
  "list_id": "Vg4f763Kq892Lm0aPz7xYw",
  "status": "active",
  "page": 1,
  "limit": 100,
  "total": 1520,
  "subscribers": [
    {
      "email": "jane@example.com",
      "name": "Jane Doe",
      "status": "active",
      "joined_at": 1715938800,
      "custom_fields": {
        "Birthday": "1990-05-17",
        "City": "Lagos"
      }
    },
    {
      "email": "john@example.com",
      "name": "",
      "status": "active",
      "joined_at": 1716025200,
      "custom_fields": {
        "Birthday": null,
        "City": null
      }
    }
  ]
}
```

- `list_id` the list id you passed
- `status` the status filter you passed, or `null`
- `page` and `limit` the page and page size used
- `total` how many subscribers match the filter, across all pages. There are more pages while `page * limit < total`.
- `subscribers` this page's subscribers:
  - `status` one of `active`, `unconfirmed`, `unsubscribed`, `bounced` or `complained`. Every subscriber is in exactly one state: a complaint outranks a bounce, which outranks an unsubscribe, which outranks being unconfirmed.
  - `joined_at` when the subscriber joined, as a Unix timestamp (or, if no join date is recorded, when their record was last updated)
  - `custom_fields` an object keyed by the list's custom field names. Empty values are `null`; `Date` fields are formatted `YYYY-MM-DD` in your account's timezone.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `Invalid status`

Error: `Invalid page`

Error: `Invalid limit`

Error: `List does not exist`

Error: `Unable to read subscribers`

A list that belongs to another brand is reported as `List does not exist`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("status", "active");
urlencoded.append("page", "1");
urlencoded.append("limit", "100");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/subscribers/get-subscribers.php", requestOptions)
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
  'status': 'active',
  'page': '1',
  'limit': '100'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/subscribers/get-subscribers.php',
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
