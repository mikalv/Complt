var platformInput = process.argv[2];

if (platformInput === 'e' || platformInput === 'electron') {
  var platform = {
      name: 'electron',
      buildFolder: 'build/electron',
      publicFolder: 'electron',
      isImplicit: false
  };
} else if (platformInput === 'w' || platformInput === 'web') {
  var platform = {
    name: 'web',
    buildFolder: 'build/web',
    publicFolder: 'public',
    isImplicit: false
  };
} else {
  var platform = {
    name: 'web',
    buildFolder: 'build/web',
    publicFolder: 'public',
    isImplicit: true
  };
}
module.exports = platform;
