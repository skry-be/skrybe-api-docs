---
title: Send Transactional Email
sidebar_label: Send Transactional
sidebar_position: 2
---

This method sends a one-off transactional email (OTP, password reset, alerts, etc.) to a single recipient and delivers it immediately. Unlike [`send.php`](./send.md), nothing is queued or scheduled, no list or campaign is created, and the request waits for the mail server's answer. Each email sent counts as one email against the brand's sending quota.

The request body must be JSON, sent with `Content-Type: application/json`. Form-encoded bodies are rejected with `Invalid JSON payload.`

**URL**  
https://dashboard.skry.be/api/emails/send-transactional.php

**PARAMETERS**(POST, JSON body)  

1. `api_key` your API key for the brand.
2. `to_email` the recipient email address (single email only).
3. `subject` the 'Subject' of your email.
4. `from_email` the 'From email' of your email. Its domain must be one of the brand's allowed From domains; if you leave it out the request is refused with the From domain error below.
5. `html_body` the 'HTML version' of your email. Required unless `plain_body` is provided.
6. `plain_body` the 'Plain text version' of your email. Required if `html_body` is omitted.
7. `from_name` the 'From name'. Defaults to the brand's 'From name'. (optional)
8. `reply_to` the 'Reply to' email. If omitted it defaults to the brand's 'Reply to' when `from_name` is also omitted, otherwise to `from_email`. (optional)

**RESPONSE** (JSON)

Every response is JSON with a `status` of `success` or `error` and a `message`, plus an HTTP status code.

```json title="Success (200)"
{ "status": "success", "message": "Email sent successfully.", "message_id": "0100019a1b2c3d4e-5f6a7b8c-...-000000" }
```

`message_id` is included when the email is sent through Amazon SES.

```json title="Example failure (500)"
{
  "status": "error",
  "message": "SES rejected the message.",
  "error_info": "<error returned by SES>",
  "code": 400
}
```

Error (405): `Only POST method is accepted.`

Error (400): `Invalid JSON payload.`

Error (400): `Missing required fields. Required: api_key, to_email, subject, and html_body or plain_body.`

Error (400): `Invalid to_email format.`

Error (429): `Too many failed attempts. Try again later.` (after 10 failed API key attempts from your IP address within 15 minutes, it is blocked for 15 minutes)

Error (401): `Invalid API key.`

Error (403): `This From email domain is not authorized for the specified brand.`

Error (403): `Domain "<domain>" is not verified in SES. Full domain verification is required.`

Error (403): `Account under review: <reason>. Sending is disabled.`

Error (402): `Quota exceeded or subscription expired.`

Error (500): `Database error while fetching credentials.`

Error (500): `No sending credentials for this brand.`

Error (500): `No sending method configured for this brand.`

Error (500): `SES rejected the message.` (with `error_info` and `code`)

Error (500): `Email could not be sent.` (with `error_info`)

Error (500): `An exception occurred.` (with `error_info`)

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var payload = {
  "api_key": "<YOUR_API_KEY>",
  "to_email": "user@example.com",
  "from_name": "Skrybe Security",
  "from_email": "no-reply@yourdomain.com",
  "reply_to": "support@yourdomain.com",
  "subject": "Your one-time passcode",
  "html_body": "<p>Your code is <strong>384092</strong>. It expires in 5 minutes.</p>",
  "plain_body": "Your code is 384092. It expires in 5 minutes."
};

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(payload),
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/emails/send-transactional.php", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
let data = JSON.stringify({
  'api_key': '<YOUR_API_KEY>',
  'to_email': 'user@example.com',
  'from_name': 'Skrybe Security',
  'from_email': 'no-reply@yourdomain.com',
  'reply_to': 'support@yourdomain.com',
  'subject': 'Your one-time passcode',
  'html_body': '<p>Your code is <strong>384092</strong>. It expires in 5 minutes.</p>',
  'plain_body': 'Your code is 384092. It expires in 5 minutes.'
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/emails/send-transactional.php',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  // Error responses use HTTP error statuses; the JSON body is in error.response.data
  console.log(error.response ? error.response.data : error);
});
```

Looking for campaign-style sends (multiple recipients, optional scheduling, templating)? Use [`send.php`](./send.md) instead.
