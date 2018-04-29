---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
  details: Absolutely no setup; directly runs in browser without any configuration.
- title: Vue-Powered
  details: Enjoy the complete dev experience of Vue; write with component, use webpack or CLI plugins.
- title: Shareable
  details: Keynote generates a static HTML page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Rahul Kadyan
---

### No setup, no installation

```html
<link rel="stylesheet" href="//unpkg.com/vue-keynote/dist/vue-keynote.css" />
...
<script src="//unpkg.com/vue"></script>
<script src="//unpkg.com/vue-keynote"></script>
...
<div id="app">
  <Keynote>
    ...
  </Keynote>
</div>
<script>
  new Vue({ el: '#app' })
</script>
```

::: warning
Requires Vue version >= 2.5
:::
