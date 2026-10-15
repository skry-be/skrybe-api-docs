---
title: Get brands (admin)
sidebar_label: Get brands
sidebar_position: 2
---

This method returns every brand in the account: their ids and names. Use a brand's `id` as the `brand_id` of the other admin endpoints.

**URL**  
https://dashboard.skry.be/api/admin/brands/get-brands.php

**PARAMETERS**(POST)  

1. `api_key` the main account's API key. Brand keys are rejected with `Invalid API key`.

**RESPONSE** (JSON)

Success: a JSON object with one entry per brand, keyed `brand1`, `brand2`, and so on. Each `id` is the brand's numeric id, as a string.

```json
{
  "brand1": {
    "id": "1",
    "name": "Acme"
  },
  "brand2": {
    "id": "7",
    "name": "Acme Outlet"
  }
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `No brands found`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<MAIN_ACCOUNT_API_KEY>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/admin/brands/get-brands.php", requestOptions)
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
  'api_key': '<MAIN_ACCOUNT_API_KEY>'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/admin/brands/get-brands.php',
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
