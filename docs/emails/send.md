---
title: Send Individual Emails
sidebar_label: Send

---

This method allows you to send or schedule individual emails.

**URL**  
https://dashboard.skry.be/api/emails/send.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `from_name` the 'From name' of your email
3. `from_email` the 'From email' of your email
4. `reply_to` the 'Reply to' of your email
5. `subject` the 'Subject' of your email (will also appear as the campaign title in your dashboard)
6. `plain_text` the 'Plain text version' of your email (optional)
7. `html_text` the 'HTML version' of your email
8. `to` Array of email addresses to send to. If no list_ids provided, these emails will be added to a new list automatically.
9. `recipient-variables` JSON object containing recipient-specific variables. Format: `{"user@example.com": {"first":"John", "id":1}, "user2@example.com": {"first":"Jane", "id":2}}`. Use these variables in your email content as [recipient.first], [recipient.id], etc.
10. `list_ids` Optional. List IDs should be single or comma-separated. The encrypted & hashed ids can be found under **View all lists** section named **ID**.
11. `query_string` eg. Google Analytics tags (optional)
12. `track_opens` Set to 0 to disable, 1 to enable and 2 for anonymous opens tracking.
13. `track_clicks` Set to 0 to disable, 1 to enable and 2 for anonymous clicks tracking.
14. `schedule_date_time` Email will be scheduled if a valid date/time is passed. Date/time format eg. June 15, 2021 6:05pm. The minutes part of the time has to be in increments of 5, eg. 6pm, 6:05pm, 6:10pm, 6:15pm.
15. `schedule_timezone` Eg. 'America/New_York'. See the list of PHP's supported timezones. This parameter only applies if you're scheduling your email with schedule_date_time parameter. Skrybe will use your default timezone if this parameter is empty.

**RESPONSE** (Plain text)

Success: `Email sent successfully`

Success: `Email scheduled`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `From name not passed`

Error: `From email not passed`

Error: `Reply to email not passed`

Error: `Subject not passed`

Error: `HTML not passed`

Error: `No recipient emails provided`

Error: `Invalid email address format`

Error: `One or more list IDs are invalid`

Error: `Unable to send email`

Error: `Unable to schedule email`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<Your key goes here>");
urlencoded.append("from_name", "Mayo");
urlencoded.append("from_email", "contact@example.com");
urlencoded.append("reply_to", "contact@example.com");
urlencoded.append("subject", "Q4 Newsletter");  // Will appear as campaign title in dashboard
urlencoded.append("html_text", "<html><body>Hello [recipient.first]!<br>Your ID is: [recipient.id]</body></html>");
urlencoded.append("to", ["user@example.com", "user2@example.com"]);
urlencoded.append("recipient-variables", JSON.stringify({
  "user@example.com": {"first": "John", "id": 1},
  "user2@example.com": {"first": "Jane", "id": 2}
}));
urlencoded.append("track_opens", "1");
urlencoded.append("track_clicks", "1");
urlencoded.append("schedule_date_time", "June 15, 2024 6:05pm");
urlencoded.append("schedule_timezone", "America/New_York");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/emails/send.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
