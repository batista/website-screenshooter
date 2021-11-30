exports.devices = [
  { name: 'full-hd', isMobile: false, hasTouch: false, width: 1920, height: 1080 },
  { name: 'laptop-1', isMobile: false, hasTouch: false, width: 1366, height: 768 },
  { name: 'small-desktop-1', isMobile: false, hasTouch: false, width: 1280, height: 800 },
  { name: 'small-desktop-2', isMobile: false, hasTouch: false, width: 1024, height: 768 },
  { name: 'ipad', isMobile: true, hasTouch: true, width: 768, height: 1024 },
  { name: 'android', isMobile: true, hasTouch: true, width: 360, height: 640 },
  { name: 'iphone', isMobile: true, hasTouch: true, width: 375, height: 667 },
];

exports.urls = [
  {
    name: 'before',
    link: 'https://example.com/my-page',
    cookies: [
      {
        name: 'CookieConsentPolicy',
        value: 'essential',
        domain: 'example.com',
      },
    ],
  },
  {
    name: 'after',
    link: 'http://localhost:4200/my-page',
    cookies: [
      {
        name: 'CookieConsentPolicy',
        value: 'essential',
        domain: 'localhost',
      },
    ],
  },
];
