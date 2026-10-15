---
title: Unsubscribe
sidebar_label: Unsubscribe
sidebar_position: 2
---

This method unsubscribes a user from a list. If the list is set to unsubscribe people from all lists, the address is unsubscribed from every list in the brand. The list's double opt-out ("Confirm unsubscribe?") setting doesn't apply to API calls.

**URL**  
https://dashboard.skry.be/unsubscribe

**PARAMETERS**(POST)  

1. `email` the subscriber's email address.
2. `list` the encrypted id of the list to unsubscribe the user from. It can be found under **View all lists** in the column named **ID**.
3. `boolean` set this to `true` to get a plain-text response. Without it, the response is an HTML page meant for people clicking an unsubscribe link. Always pass it when calling the API from code.

**RESPONSE** (Plain text)

Success: `1`

Error: `Some fields are missing.`

Error: `Invalid email address.`

Error: `Email does not exist.`

This endpoint doesn't take an API key. The success response is `1`, not `true`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("email", "jane@example.com");
urlencoded.append("list", "<LIST_ID>");
urlencoded.append("boolean", "true");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/unsubscribe", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'email': 'jane@example.com',
  'list': '<LIST_ID>',
  'boolean': 'true'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/unsubscribe',
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
