export default {
  title: 'iCLOTHING',
  titleTemplate: '%s - iCLOTHING',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    { charset: 'utf-8' },
    { vmid: 'description', name: 'description', content: "Discover the latest trends in women's fashion at iCLOTHING. Shop this season's collection of dresses, tops, footwear and accessories, we have you covered - all with next day delivery!" },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui' },
    { name: 'robots', content: 'index, follow' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'apple-mobile-web-app-status-bar-style', content: '#ffffff' }
  ],
  link: [
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/assets/favicon-16x16.png', sizes: '16x16' },
    // { rel: 'apple-touch-icon', href: '/assets/apple-touch-icon.png' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/16.png', sizes: '16x16' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/32.png', sizes: '32x32' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/29.png', sizes: '29x29' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/40.png', sizes: '40x40' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/50.png', sizes: '50x50' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/64.png', sizes: '64x64' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/72.png', sizes: '72x72' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/80.png', sizes: '80x80' },
    { rel: 'apple-touch-icon', type: 'image/png', href: '/assets/appleicons/256.png', sizes: '256x256' },

    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_2048.png', sizes: '2048x2732' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1668.png', sizes: '1668x2224' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1536.png', sizes: '1536x2048' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1125.png', sizes: '1125x2436' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_1242.png', sizes: '1242x2208' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_750.png', sizes: '750x1334' },
    { rel: 'apple-touch-startup-image', href: '/assets/apple_splash_640.png', sizes: '640x1136' },
    { rel: 'manifest', href: '/assets/manifest.json' },
    { rel: 'stylesheet', href: '/assets/css/styla.css' }
    // { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css' },
    // { rel: 'stylesheet', href: '/assets/css/swiper-bundle.min.css' },
    // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  ],
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js',
      async: true,
      integrity: 'sha384-ptgwb3/v69WGur7IwSnWOowVxE7hcRB3DG/EiHdejrw2sFNwUHynFbiRMPxc4hdS',
      crossorigin: 'anonymous'
    },
    {
      src: '/assets/js/swiper-bundle.min.js',
      async: true
    }
  ]
}
