const fs = require('fs');
const path = require('path');
const assets = require('../build/asset-manifest.json');

const linkHeader = `</${assets['main.css']}>; rel=preload; as=style,</${assets['main.js']}>; rel=preload; as=script,</${assets['vendor.js']}>; rel=preload; as=script`;
// '/!(static|appcache|*.png|*.json|*.js|*.ico|*.svg|)';
const firebaseConfig = {
  hosting: {
    public: 'build',
    rewrites: [
      {
        source: '**',
        destination: '/index.html',
      },
    ],
    headers: [
      {
        source: '/inbox',
        headers: [
          {
            key: 'Link',
            value: linkHeader,
          },
        ],
      },
    ],
  },
};

fs.writeFileSync(
  path.join(__dirname, '..', 'firebase.json'),
  JSON.stringify(firebaseConfig, null, 2)
);
