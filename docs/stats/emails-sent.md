---
title: Total emails sent
sidebar_label: Emails sent
sidebar_position: 1
---

This method returns the total number of emails sent through Skrybe across the whole platform: campaign emails, autoresponder emails and successfully sent transactional emails. It's public: no API key is needed, and it can be called from a browser on any site. Responses may be cached for up to 5 minutes.

**URL**  
https://dashboard.skry.be/api/stats/emails-sent.php

**PARAMETERS**(GET)  

None.

**RESPONSE** (JSON)

```json title="Success (200)"
{"total_emails_sent":48213977}
```

Error (500): `{"error":"Database connection failed"}`

Error (500): `{"error":"Query failed"}`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/stats/emails-sent.php", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result.total_emails_sent))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/stats/emails-sent.php'
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});
```
