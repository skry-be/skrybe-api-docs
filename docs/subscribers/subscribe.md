---
title: Subscribe
sidebar_label: Subscribe
sidebar_position: 1
---

This method adds a new subscriber to a list. You can also use it to update an existing subscriber's name and custom fields. If you'd rather embed a subscribe form on your website, open **View all lists**, select your list, then click **Subscribe form** at the top of the page.

**URL**  
https://dashboard.skry.be/subscribe

**PARAMETERS**(POST)  

:::tip Custom fields
You can also set or update custom fields. Use the field's name, with any spaces removed, as the parameter name (it is case-sensitive): for a field named `Birthday`, pass `Birthday`; for a field named `Favourite colour`, pass `Favouritecolour`. For date fields, `YYYY-MM-DD` is the safest format; dates with slashes are read month first (`5/6/2024` is May 6), and a value that can't be read as a date is stored empty. [Get list](../lists/get-list.md) returns a list's custom fields.
:::

1. `api_key` your API key. It must belong to the same brand as the list.
2. `email` the subscriber's email address.
3. `list` the encrypted id of the list to subscribe the user to. It can be found under **View all lists** in the column named **ID**.
4. `name` the subscriber's name. (optional)
5. `country` the subscriber's [2-letter country code](https://datahub.io/core/country-list#resource-data), in capitals, eg. `US`. (optional)
6. `ipaddress` the subscriber's IP address. (optional)
7. `referrer` the URL the subscriber signed up from. (optional)
8. `notes` notes to store with the subscriber. (optional)
9. `gdpr` if you're signing up EU users in a GDPR-compliant manner, set this to `true`. (optional)
10. `silent` set this to `true` if your list is double opt-in but you want to skip the confirmation email and sign the user up as single opt-in instead. (optional)
11. `hp` a honeypot field for spambots. Leave it out of your own calls: if it has any value, the call is rejected as `Invalid email address.` (optional)
12. `boolean` set this to `true` to get a plain-text response. Without it, the response is an HTML page meant for people submitting a form (or a redirect to the list's subscribed URL). Always pass it when calling the API from code.

**RESPONSE** (Plain text)

Success: `1`

Error: `Some fields are missing.`

Error: `Invalid email address.`

Error: `IP address is invalid.`

Error: `Country must be a valid 2 letter country code`

Error: `Referrer is not a valid URL`

Error: `Bounced email address.`

Error: `Invalid list ID.`

Error: `API key not passed`

Error: `Invalid API key`

Error: `Already subscribed.`

Error: `Email is suppressed.`

`Already subscribed.` is returned when the address is already a confirmed, subscribed member of the list. The subscriber's `name` and custom fields are still updated with the values you passed, so this response also means an update went through.

`Bounced email address.` is returned for an address that has hard-bounced, and `Email is suppressed.` for an address (or domain) on the brand's suppression or blocked-domain list.

The success response is `1`, not `true`.

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<YOUR_API_KEY>");
urlencoded.append("name", "Jane Doe");
urlencoded.append("email", "jane@example.com");
urlencoded.append("list", "<LIST_ID>");
urlencoded.append("boolean", "true");

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
  'name': 'Jane Doe',
  'email': 'jane@example.com',
  'list': '<LIST_ID>',
  'boolean': 'true'
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
