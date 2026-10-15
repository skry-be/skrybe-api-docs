---
title: Get templates
sidebar_label: Get templates
sidebar_position: 1
---

This method returns the templates of the brand your API key belongs to, sorted by name. It doesn't include their HTML; use [Get template](./get-template.md) for that.

**URL**  
https://dashboard.skry.be/api/templates/get-templates.php

**PARAMETERS**(POST)  

1. `api_key` your API key.

**RESPONSE** (JSON)

Success:

```json
{
  "templates": [
    {
      "id": 12,
      "name": "Monthly newsletter",
      "from_name": "Acme",
      "from_email": "news@acme.com",
      "reply_to": "hello@acme.com",
      "editor": "html"
    },
    {
      "id": 15,
      "name": "Welcome",
      "from_name": "Acme",
      "from_email": "news@acme.com",
      "reply_to": "hello@acme.com",
      "editor": "dragdrop"
    }
  ]
}
```

- `id` the template's numeric id
- `name` the template's name
- `from_name`, `from_email`, `reply_to` the sender details saved with the template (empty strings if not set)
- `editor` which editor the app opens the template in: `html` (the code editor) or `dragdrop`

A brand with no templates gets `{"templates":[]}`.

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

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

fetch("https://dashboard.skry.be/api/templates/get-templates.php", requestOptions)
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
  url: 'https://dashboard.skry.be/api/templates/get-templates.php',
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
