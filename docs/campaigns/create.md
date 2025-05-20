---
title: Create and send campaigns
sidebar_label: Create

---

This method allows you to create, send or schedule a campaign.

**URL**  
https://dashboard.skry.be/api/campaigns/create.php

**PARAMETERS**(POST)  

1. `api_key` your API key.
2. `from_name` the 'From name' of your campaign
3. `from_email` the 'From email' of your campaign
4. `reply_to` the 'Reply to' of your campaign
5. `title` the 'Title' of your campaign
6. `subject` the 'Subject' of your campaign
7. `plain_text` the 'Plain text version' of your campaign (optional)
8. `html_text` the 'HTML version' of your campaign
9. `list_ids` Required only if you set send_campaign to 1 and no segment_ids are passed in. List IDs should be single or comma-separated. The encrypted & hashed ids can be found under **View all lists** section named **ID**.
10. `segment_ids` Required only if you set send_campaign to 1 and no list_ids are passed in. Segment IDs should be single or comma-separated. Segment ids can be found in the segments setup page.  
11. `exclude_list_ids` Lists to exclude from your campaign. List IDs should be single or comma-separated. The encrypted & hashed ids can be found under **View all lists** section named **ID**. (optional)
12. `exclude_segments_ids` Segments to exclude from your campaign. Segment IDs should be single or comma-separated. Segment ids can be found in the segments setup page. (optional)
13. `query_string` eg. Google Analytics tags (optional)
14. `track_opens` Set to 0 to disable, 1 to enable and 2 for anonymous opens tracking.
15. `track_clicks` Set to 0 to disable, 1 to enable and 2 for anonymous clicks tracking.
16. `send_campaign` Set to 1 if you want to send the campaign as well and not just create a draft. Default is 0.
17. `schedule_date_time` Campaign will be scheduled if a valid date/time is passed. Date/time format eg. June 15, 2021 6:05pm. The minutes part of the time has to be in increments of 5, eg. 6pm, 6:05pm, 6:10pm, 6:15pm.
18. `schedule_timezone` Eg. 'America/New_York'. See the list of PHP's supported timezones. This parameter only applies if you're scheduling your campaign with schedule_date_time parameter. Skrybe will use your default timezone if this parameter is empty.

**RESPONSE** (Plain text)

Success: `Campaign created`

Success: `Campaign created and now sending`

Success: `Campaign scheduled`

Error: `No data passed`

Error: `API key not passed`

Error: `Invalid API key`

Error: `From name not passed`

Error: `From email not passed`

Error: `Reply to email not passed`

Error: `Subject not passed`

Error: `HTML not passed`

Error: `List or segment ID(s) not passed`

Error: `One or more list IDs are invalid`

Error: `One or more segment IDs are invalid`

Error: `List or segment IDs does not belong to a single brand`

Error: `Brand ID not passed`

Error: `Unable to create campaign`

Error: `Unable to create and send campaign`

Error: `Unable to schedule campaign`

Error: `Unable to calculate totals`

**EXAMPLES**

```js title="Example request in JavaScript with fetch API"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("api_key", "<Your key goes here>");
urlencoded.append("from_name", "Mayo");
urlencoded.append("from_email", "contact@example.com");
urlencoded.append("reply_to", "contact@example.com");
urlencoded.append("title", "Here's a sample campaign yo");
urlencoded.append("subject", "e be thingsss ooo");
urlencoded.append("html_text", "<html><body>e be thinggssssss</body></html>");
urlencoded.append("list_ids", "<hashed list id from view all page>");
urlencoded.append("track_opens", "1");
urlencoded.append("track_clicks", "1");
urlencoded.append("send_campaign", "1");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("https://dashboard.skry.be/api/campaigns/create.php", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

```js title="Example request in JavaScript with axios"
const axios = require('axios');
const qs = require('qs');
let data = qs.stringify({
  'api_key': '<Your api key goes here>',
  'from_name': 'Mayo',
  'from_email': 'contact@example.com',
  'reply_to': 'contact@example.com',
  'title': 'Here\'s a sample campaign yo',
  'subject': 'e be thingsss ooo',
  'html_text': '<html><body>e be thinggssssss</body></html>',
  'list_ids': '<hashed list id from view all page>',
  'track_opens': '1',
  'track_clicks': '1',
  'send_campaign': '1' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://dashboard.skry.be/api/campaigns/create.php',
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