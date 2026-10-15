---
title: Subscribers (admin)
sidebar_label: Subscribers
sidebar_position: 6
---

The admin API has its own copies of three subscriber endpoints. They take the same parameters and give the same responses as the brand versions, but they need the **main account's API key** and work on a list in any brand. Brand keys are rejected with `Invalid API key`.

With a brand key, use [Active subscriber count](../subscribers/active-subscriber-count.md), [Delete subscriber](../subscribers/delete-subscriber.md) and [Subscription status](../subscribers/subscription-status.md) instead.

In all three, `list_id` is the encrypted id of the list, as returned by [Get lists (admin)](./get-lists.md). A `list_id` that can't be decoded is reported as `List ID not passed`. Responses are plain text.

## Active subscriber count

Returns the number of active subscribers in a list: confirmed, and not unsubscribed, bounced or complained.

**URL**  
https://dashboard.skry.be/api/admin/subscribers/active-subscriber-count.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key.
2. `list_id` the encrypted id of the list.

**RESPONSE** (Plain text)

Success: the count, eg. `1204`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

## Delete subscriber

Permanently deletes a subscriber from a list.

**URL**  
https://dashboard.skry.be/api/admin/subscribers/delete.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key.
2. `list_id` the encrypted id of the list.
3. `email` the email address to delete.

**RESPONSE** (Plain text)

Success: `1`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

Error: `Email address not passed`

Error: `Subscriber does not exist`

## Subscription status

Returns a subscriber's status in a list.

**URL**  
https://dashboard.skry.be/api/admin/subscribers/subscription-status.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key.
2. `email` the subscriber's email address.
3. `list_id` the encrypted id of the list.

**RESPONSE** (Plain text)

Success: one of `Subscribed`, `Unconfirmed`, `Unsubscribed`, `Bounced`, `Soft bounced` or `Complained`.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Email not passed`

Error: `List ID not passed`

Error: `Email does not exist in list`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<MAIN_ACCOUNT_API_KEY>");
urlencoded.append("list_id", "<LIST_ID>");
urlencoded.append("email", "contact@example.com");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/admin/subscribers/subscription-status.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<MAIN_ACCOUNT_API_KEY>',
  'list_id': '<LIST_ID>',
  'email': 'contact@example.com'
});

axios.post('https://dashboard.skry.be/api/admin/subscribers/delete.php', data, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
.then((response) => console.log(response.data))
.catch((error) => console.log(error));
```
