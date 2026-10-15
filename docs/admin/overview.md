---
title: Admin endpoints
sidebar_label: Overview
sidebar_position: 1
---

The endpoints under `/api/admin/` work across every brand in the account, so they only accept the **main account's API key**: the key of the account owner, the login that created the Skrybe account. A brand's API key (or a key of any other login) is rejected with `Invalid API key`.

This is the opposite of the other endpoints in these docs, which only accept a **brand's** API key and act on that brand alone. The main account's key gets errors such as `Brand does not exist` or `List does not exist` there. See [Authentication](../authentication.md).

| Endpoint | What it does |
| --- | --- |
| [Get brands (admin)](./get-brands.md) | Lists every brand in the account |
| [Get lists (admin)](./get-lists.md) | Lists the lists of any brand |
| [Create campaign (admin)](./create-campaign.md) | Creates, sends or schedules a campaign for any brand |
| [Set transport](./set-transport.md) | Shows or switches whether a brand sends through the relay or SES |
| [Subscribers (admin)](./subscribers.md) | Admin copies of three subscriber endpoints (currently not working) |

Keep the main account's key on your server. Anyone who has it can act on every brand.
