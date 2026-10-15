---
title: Delete template
sidebar_label: Delete template
sidebar_position: 5
---

This method deletes a template. Campaigns already made from it are not affected.

**URL**  
https://dashboard.skry.be/api/templates/delete-template.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `template_id` the numeric id of the template, as returned by [Get templates](./get-templates.md).

**RESPONSE** (JSON)

Success:

```json
{
  "template_id": 12,
  "deleted": true
}
```

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Template ID not passed`

Error: `Template does not exist`

Error: `Unable to delete template`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("template_id", "12");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/templates/delete-template.php", requestOptions)
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
  'template_id': '12'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/templates/delete-template.php',
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
