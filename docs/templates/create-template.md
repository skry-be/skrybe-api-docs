---
title: Create template
sidebar_label: Create template
sidebar_position: 3
---

This method creates a template in the brand your API key belongs to.

**URL**  
https://dashboard.skry.be/api/templates/create-template.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `name` the name of the template.
3. `html_text` the HTML of the template.
4. `plain_text` the plain-text version. (optional)
5. `from_name` the From name to save with the template. (optional)
6. `from_email` the From email to save with the template. Its domain must be one of the brand's allowed sending domains. (optional)
7. `reply_to` the Reply-to address to save with the template. (optional)
8. `editor` the editor the app opens the template in: `html` or `dragdrop`. Default is `html`, since HTML sent through the API is usually hand-written and the drag-and-drop editor can reshape it. (optional)

**RESPONSE** (JSON)

Success: the new template, without its HTML.

```json
{
  "id": 12,
  "name": "Monthly newsletter",
  "from_name": "Acme",
  "from_email": "news@acme.com",
  "reply_to": "hello@acme.com",
  "editor": "html"
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

Error: `Template name not passed`

Error: `HTML not passed`

Error: `A field is too long: <field> (at most <n> characters)`

Error: `Template name cannot be empty`

Error: `HTML cannot be empty`

Error: `Invalid from_email`

Error: `Unauthorised From email domain`

Error: `Invalid reply_to`

Error: `editor must be html or dragdrop`

Error: `Unable to create template`

`name` can be up to 500 characters, and `from_name`, `from_email` and `reply_to` up to 100 each. When a field is too long, the error names it, eg. `A field is too long: from_name (at most 100 characters)`.

`Unauthorised From email domain` means `from_email` isn't on one of the brand's allowed sending domains (the same check the app makes when you save a template).

`Brand does not exist` is returned when the key isn't tied to a brand, for example the main account's key.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("name", "Monthly newsletter");
urlencoded.append("html_text", "<html><body><h1>Hello [Name,fallback=there]</h1></body></html>");
urlencoded.append("from_name", "Acme");
urlencoded.append("from_email", "news@acme.com");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/templates/create-template.php", requestOptions)
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
  'name': 'Monthly newsletter',
  'html_text': '<html><body><h1>Hello [Name,fallback=there]</h1></body></html>',
  'from_name': 'Acme',
  'from_email': 'news@acme.com'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/templates/create-template.php',
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
