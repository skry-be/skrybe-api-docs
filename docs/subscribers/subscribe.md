---
title: Subscribe
sidebar_label: Subscribe
sidebar_position: 1
---

This method adds a new subscriber to a list. You can also use this method to update an existing subscriber. On another note, you can also embed a subscribe form on your website using skrybe's subscribe form HTML code. Visit View all lists, select your desired list then click 'Subscribe form' at the top of the page.

**URL**  
https://dashboard.skry.be/subscribe

**PARAMETERS**(POST)  

:::tip Note
You can also pass values into custom fields or update them. To do so, use the personalization tag of the custom field as the parameter. Say, your custom field tag is [Birthday,fallback=], you can use the parameter, 'Birthday' to add values to this custom field or update it.

:::

1. `api_key` your API key.
2. `name` user's name (optional)
3. `email` user's email
4. `list` the list id you want to subscribe a user to. This encrypted & hashed id can be found under **View all lists** section named **ID**.
5. `country` user's [2 letter country code](https://datahub.io/core/country-list#resource-data) (optional)
6. `ipaddress` user's IP address (optional)
7. `referrer` the URL where the user signed up from (optional)
8. `gdpr` if you're signing up EU users in a GDPR compliant manner, set this to "true" (optional)
9. `silent` set to "true" if your list is 'Double opt-in' but you want to bypass that and signup the user to the list as 'Single Opt-in instead' (optional)
10. `hp` include this 'honeypot' field to prevent spambots from signing up via this API call. When spambots fills in this field, this API call will exit, preventing them from signing up fake addresses to your form. (optional)
11. `boolean` set this to "true" so that you'll get a plain text response (optional) 

**RESPONSE** (Plain text) 

Success: `true`

Error: `Some fields are missing.`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Invalid email address.`

Error: `Already subscribed.`

Error: `Bounced email address.`

Error: `Email is suppressed.`

Error: `Invalid list ID.`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("name", "Mayowaaaaaa");
urlencoded.append("email", "contact@example.com");
urlencoded.append("list", "<YOUR_LIST_ID>");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/subscribe", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<YOUR_API_KEY>',
  'name': 'Mayowaaaaaa',
  'email': 'contact@example.com',
  'list': '<YOUR_LIST_ID>' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/subscribe',
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
