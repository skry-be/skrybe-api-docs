---
title: Authentication
sidebar_label: Authentication
sidebar_position: 0
---

Every request to the Skrybe API is a `POST` to `https://dashboard.skry.be/...` with the parameters form-encoded (`Content-Type: application/x-www-form-urlencoded`). You authenticate by passing your API key as the `api_key` parameter. There are no auth headers.

## Which key to use

There are two kinds of API key, and each endpoint accepts only one of them.

**A brand's API key** belongs to one brand. Every endpoint outside `/api/admin/` that takes an API key takes a brand key: lists, subscribers, templates, autoresponders, campaigns and so on. Those endpoints work out the brand from the key rather than from a parameter. Where an endpoint checks that an id belongs to the key's brand, an id from another brand is reported as missing (`List does not exist`, `Template does not exist`, ...) rather than as forbidden.

**The main account's API key** is the key of the account owner. It isn't tied to a brand, so the brand endpoints reject it, with errors such as `Brand does not exist`, `List does not exist` or `Invalid API key`. It is only for the [Admin endpoints](./admin/overview.md) under `/api/admin/`, which act across every brand and reject brand keys.

Keep your keys on your server. Don't put them in browser or mobile app code.

## Responses and errors

Successful responses are either plain text (eg. `Campaign created`, or a number) or JSON, as each endpoint's page says.

Unless an endpoint's page says otherwise (the [Emails](./emails/send.md) endpoints, for example, set HTTP status codes), errors are short plain-text messages such as `Invalid API key` or `List ID not passed`, sent with HTTP status 200, even on endpoints that return JSON on success. Check the response body: for a JSON endpoint, a body that doesn't parse as JSON is an error message. [Subscribe](./subscribers/subscribe.md) and [Unsubscribe](./subscribers/unsubscribe.md) only answer in plain text when you pass `boolean=true`.

Most endpoints share these errors:

- `No data passed` none of the endpoint's parameters were posted
- `API key not passed` the `api_key` parameter is missing
- `Invalid API key` the key doesn't exist, or is the wrong kind of key for this endpoint

## Rate limiting of failed keys

After 10 requests with an invalid API key from the same IP address within 15 minutes, that IP address is blocked for 15 minutes. While it is blocked, every request from it gets `Invalid API key`, even with a valid key. A request with a valid key clears the count.

## IDs

List ids are encrypted strings, such as `Vg4f763Kq892Lm0aPz7xYw`. You'll find them under **View all lists** in the column named **ID**, or from [Get lists](./lists/get-lists.md). Brands, templates and autoresponders use plain numeric ids.
