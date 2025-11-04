---
title: Send Transactional Email
sidebar_label: Send Transactional
---

This method triggers a one-off transactional email (OTP, password reset, alerts, etc.) and delivers it immediately. Unlike `send.php`, nothing is queued or scheduled.

**URL**  
https://dashboard.skry.be/api/emails/send-transactional.php

**PARAMETERS**(POST)  

1. `api_key` your API key for the brand.
2. `to_email` the recipient email address (single email only).
3. `subject` the 'Subject' of your email.
4. `html_body` the 'HTML version' of your email. Required unless `plain_body` is provided.
5. `plain_body` the 'Plain text version' of your email. Required if `html_body` is omitted.
6. `from_name` optional override of the brand's 'From name'.
7. `from_email` optional override of the brand's 'From email'. Must be on an allowed domain for the brand.
8. `reply_to` optional override of the brand's 'Reply to' email.

Note: Send JSON in the request body and set `Content-Type: application/json`. This endpoint does not accept form-encoded bodies.

Brand defaults: If `from_name`, `from_email`, or `reply_to` are omitted, the brand settings configured in the dashboard are used.

**RESPONSE** (JSON)

```json title="Success"
{ "status": "success", "message": "Email sent successfully." }
```

```json title="Example failure"
{
  "status": "error",
  "message": "SES rejected the message.",
  "error_info": "Email address is not verified. The following identities failed...",
  "code": 400
}
```

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var payload = {
  "api_key": "<your-api-key>",
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

Looking for campaign-style sends (multiple recipients, optional scheduling, templating)? Use [`send.php`](./send.md) instead.

