---
title: Subscribers (admin)
sidebar_label: Subscribers
sidebar_position: 6
---

The admin API has its own copies of three subscriber endpoints:

- `https://dashboard.skry.be/api/admin/subscribers/active-subscriber-count.php`
- `https://dashboard.skry.be/api/admin/subscribers/delete.php`
- `https://dashboard.skry.be/api/admin/subscribers/subscription-status.php`

:::caution Not currently working
These three endpoints currently fail before they check the API key, so don't build on them. Use [Active subscriber count](../subscribers/active-subscriber-count.md), [Delete subscriber](../subscribers/delete-subscriber.md) and [Subscription status](../subscribers/subscription-status.md) with the brand's own API key instead. They take the same parameters (`api_key`, `list_id` and, where needed, `email`).
:::
