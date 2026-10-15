---
title: Get brands
sidebar_label: Get brands
sidebar_position: 1
---

This method returns the brand your API key belongs to: its id and name. A brand's key only ever sees its own brand. To list every brand in the account, use the main account's key with [Get brands (admin)](../admin/get-brands.md).

**URL**  
https://dashboard.skry.be/api/brands/get-brands.php

**PARAMETERS**(POST)  

1. `api_key` your API key.

**RESPONSE** (JSON)

Success: a JSON object keyed `brand1`. The `id` is the brand's numeric id, as a string.

```json
{
  "brand1": {
    "id": "7",
    "name": "Acme"
  }
}
```

Error: `API key not passed`

Error: `Invalid API key`

Error: `No brands found`

`No brands found` is returned when the key isn't tied to a brand, for example the main account's key.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/brands/get-brands.php", requestOptions)
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
  'api_key': '<YOUR_API_KEY>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/brands/get-brands.php',
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
