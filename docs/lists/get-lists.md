---
title: Get lists
sidebar_label: Get lists
---

This method returns all lists (ids and names)

**URL**  
https://dashboard.skry.be/api/lists/get-lists.php

**PARAMETERS**(POST)  

1. `api_key` your API key.

3. `include_hidden` if you want to retrieve lists that are hidden as well, set this to yes. Default is `no`.

**RESPONSE** (JSON)

Success: `You'll get a list of lists (ids and names) in JSON format`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `No lists found`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<Your api key goes here>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/lists/get-lists.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<Your api key goes here>' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/lists/get-lists.php',
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