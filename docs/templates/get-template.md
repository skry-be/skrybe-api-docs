---
title: Get template
sidebar_label: Get template
sidebar_position: 2
---

This method returns one template. Pass `include_content=yes` to get its HTML and plain text as well.

**URL**  
https://dashboard.skry.be/api/templates/get-template.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `template_id` the numeric id of the template, as returned by [Get templates](./get-templates.md).
3. `include_content` set to `yes` (or `true` or `1`) to include `html_text` and `plain_text`. Default is to leave them out. (optional)

**RESPONSE** (JSON)

Success (with `include_content=yes`):

```json
{
  "id": 12,
  "name": "Monthly newsletter",
  "from_name": "Acme",
  "from_email": "news@acme.com",
  "reply_to": "hello@acme.com",
  "editor": "html",
  "html_text": "<html><body><h1>Hello [Name,fallback=there]</h1></body></html>",
  "plain_text": "Hello [Name,fallback=there]"
}
```

- `id` the template's numeric id
- `name` the template's name
- `from_name`, `from_email`, `reply_to` the sender details saved with the template (empty strings if not set)
- `editor` which editor the app opens the template in: `html` (the code editor) or `dragdrop`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Brand does not exist`

Error: `Template ID not passed`

Error: `Template does not exist`

A template that belongs to another brand is reported as `Template does not exist`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("template_id", "12");
urlencoded.append("include_content", "yes");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/templates/get-template.php", requestOptions)
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
  'template_id': '12',
  'include_content': 'yes'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/templates/get-template.php',
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
