# KineCommunity Custo

A [Flarum](http://flarum.org) extension that attempts to integrate a Flarum forum with content managed by WordPress for homepage of KineCommunity.

JSON calls to WordPress API to source content, wash them through Mithril, display them via Flarum - hey! it's a headache ;)

Result will be faster and much, much better than current BBPress forum running at [kinecommunity.com](https://kinecommunity.com/).

### To Dos:

**Next up:** Build a content slider for YouTube videos.

Questions: build via Mithril carousel extension or using a pure JS library?

**Further down the page:** 

Figure out how to scour more content from existing WP install - can't make API calls yet
because the content I want is sourced via plugins and doesn't expose to the API.

Possible solutions: 
- fork the plugin and expose its data to WP API
- scrape WP install for this content
- fork the plugin and cache smaller bits of data from it to a known location

**In the future:**

- SSO
- Build a WP plugin that automatically sources content from YouTube/Vimeo via Cron
- Cache this content in the Flarum DB for less external API calls
- Unify look/feel of WP-managed content on non-Flarum pages to frontpage look
- Should forum posts display images on main feed a-la Facebook?


---
### Boilerplate inserted by Flarum:


![License](https://img.shields.io/badge/license-MIT-blue.svg) [![Latest Stable Version](https://img.shields.io/packagist/v/raafirivero/kine-top.svg)](https://packagist.org/packages/raafirivero/kine-top)

### Installation

Use [Bazaar](https://discuss.flarum.org/d/5151-flagrow-bazaar-the-extension-marketplace) or install manually with composer:

```sh
composer require raafirivero/kine-top
```

### Updating

```sh
composer update raafirivero/kine-top
```

### Links

- [Packagist](https://packagist.org/packages/raafirivero/kine-top)
- [Source code on GitHub](https://github.com/raafirivero/kine-top)