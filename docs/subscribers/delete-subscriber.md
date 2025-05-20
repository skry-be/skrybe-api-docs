---
title: Delete subscriber
sidebar_label: Delete subscriber
sidebar_position: 3
---

This method deletes a subscriber off a list 

**URL**  
https://dashboard.skry.be/api/subscribers/delete.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the id of the list you want to delete the subscriber from. This encrypted id can be found under **View all lists** section named **ID**
3. `email` the email address you want to delete

**RESPONSE** (Plain text) 

Success: `true`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

Error: `Email address not passed`

Error: `Subscriber does not exist`

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

fetch("https://dashboard.skry.be/api/subscribers/delete.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<API_KEY>',
  'email': '<EMAIL>',
  'list_id': '<LIST_ID>' 
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
