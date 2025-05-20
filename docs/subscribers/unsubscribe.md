---
title: Unsubscribe
sidebar_label: Unsubscribe
sidebar_position: 2
---

This method unsubscribes a user from a list.

**URL**  
https://dashboard.skry.be/unsubscribe

**PARAMETERS**(POST)  

1. `email` user's email
2. `list` the list id you want to unsubscribe a user from. This encrypted & hashed id can be found under **View all lists section** named **ID**
3. `boolean` set this to "true" so that you'll get a plain text response

**RESPONSE** (Plain text) 

Success: `true`

Error: `Some fields are missing.`

Error: `Invalid email address.`

Error: `Email does not exist.`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("email", "<EMAIL_ADDRESS>");
urlencoded.append("list", "<LIST_ID>");

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
  'api_key': '<YOUR_API_KEY>',
  'email': '<EMAIL_ADDRESS>',
  'list': '<LIST_ID>' 
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
