---
title: Subscription status
sidebar_label: Subscription status
sidebar_position: 4
---

This method gets the current status of a subscriber (eg. subscribed, unsubscribed, bounced, complained).

**URL**  
https://dashboard.skry.be/api/subscribers/subscription-status.php

**PARAMETERS**(POST)  

1. `api_key` your API key.

2. `email` the user's email

3. `list_id` the id of the list this email belongs to. This encrypted id can be found under **View all lists** section named **ID**

**RESPONSE** (Plain text) 

Success: `Subscribed`

Success: `Unsubscribed`

Success: `Unconfirmed`

Success: `Bounced`

Success: `Soft bounced`

Success: `Complained`

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
urlencoded.append("api_key", "<API_KEY>");
urlencoded.append("email", "<EMAIL>");
urlencoded.append("list_id", "<LIST_ID>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/subscribers/subscription-status.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'email': '<EMAIL>',
  'list_id': '<LIST_ID>' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/subscribers/subscription-status.php',
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
