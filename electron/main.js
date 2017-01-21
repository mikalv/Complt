const menubar = require('menubar');

const mb = menubar({
  height: 600,
  tooltip: 'Complt',
  showDockIcon: true,
});

mb.on('ready', () => {
  console.log('app is ready'); // eslint-disable-line no-console
});
