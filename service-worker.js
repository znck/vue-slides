/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4ac761d11ca72dd0aa879f2b5c53834b"
  },
  {
    "url": "api/index.html",
    "revision": "41fb57b21e9333989bceb72d31d0a893"
  },
  {
    "url": "assets/css/3.styles.1bd99496.css",
    "revision": "582f8a61b9cec8b5391ed5c3b441a062"
  },
  {
    "url": "assets/img/author-slide.f623c87b.png",
    "revision": "f623c87b1cb7368ab7e9d5de12a85e5e"
  },
  {
    "url": "assets/img/photo-slide.f68ca8de.png",
    "revision": "f68ca8defc241ada73a7088473de82be"
  },
  {
    "url": "assets/img/photo-title-slide-left.39cfa994.png",
    "revision": "39cfa9940b9b6c38f2f1680e371ee6ed"
  },
  {
    "url": "assets/img/photo-title-slide-right.30a74b65.png",
    "revision": "30a74b651d7167c23543ff761a1edbd0"
  },
  {
    "url": "assets/img/photo-title-slide.62b2218d.png",
    "revision": "62b2218d7bf4183252e704efb9718bdf"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/title-slide.24ddf747.png",
    "revision": "24ddf747cf6e5bf0ae82c17985bef310"
  },
  {
    "url": "assets/js/0.dae4e558.js",
    "revision": "7147326e28c2331eef318813b164d76a"
  },
  {
    "url": "assets/js/1.dd611e5c.js",
    "revision": "0ec69b9fff328f69ff4351cb5f5f5591"
  },
  {
    "url": "assets/js/2.b84b4716.js",
    "revision": "90119ebeb28f163b4cb936538099f248"
  },
  {
    "url": "assets/js/app.4349e8fb.js",
    "revision": "259464bd51e29fd372fb1b50bc9e156c"
  },
  {
    "url": "guide/index.html",
    "revision": "4efa694836ff25b3928a5415df9b70fb"
  },
  {
    "url": "hero.png",
    "revision": "ae5a14d363083e5528feb409ce1ea913"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "d6042aea340099a1a5b6ebbe580a2467"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "23ac84ff09cc01512d489d54af2e2b19"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "75b23bd5290b0b8dd1dba7d749be1c9a"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "29f592e2f7c554f260baa46d5650c3c5"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "e169761642a52a25e8fce6b7603ec085"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "9cdaa969a9637344269541fbd82552c8"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "b090dbfcdd42106d64702c10cc6d50ed"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "06ff5ed7c1579b9eaddeb7ee5f72b6b9"
  },
  {
    "url": "index.html",
    "revision": "3ad2cdf9f04721729eeedd06de1cb7d5"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
