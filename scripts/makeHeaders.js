const fs = require('fs');
const path = require('path');
const assets = require(path.join(__dirname, '..', 'build', 'asset-manifest.json'));

fs.writeFileSync(path.join(__dirname, '..', 'build', '_headers'),
`/*
  Link: </${assets['main.css']}>; rel=preload; as=stylesheet;
  Link: </${assets['react.js']}>; rel=preload; as=script;
  Link: </${assets['main.js']}>; rel=preload; as=script;
  Link: </${assets['vendor.js']}>; rel=preload; as=script;
`);
