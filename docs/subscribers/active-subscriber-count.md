---
title: Active subscriber count
sidebar_label: Active subscriber count
sidebar_position: 5
---

This method gets the total active subscriber count of a list.

**URL**  
https://dashboard.skry.be/api/subscribers/active-subscriber-count.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `list_id` the id of the list you want to get the active subscriber count. This encrypted id can be found under **View all lists** section named **ID**

**RESPONSE** (Plain text) 

Success: `You'll get an integer of the active subscriber count`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `List ID not passed`

Error: `List does not exist`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<API_KEY>");
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
  'api_key': '<API_KEY>',
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
