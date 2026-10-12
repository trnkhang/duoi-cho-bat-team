const path = require('path');
const deps = require('./package.json').dependencies;

const local = process.env.REACT_APP_ENV === 'local';

module.exports = () => ({
  name: local ? 'test_app' : 'duoi_cho_bat_team',
  filename: 'remoteEntry.js',
  exposes: local
    ? { './TestApp': path.join(__dirname, './src/duoi-cho-bat-team-app') }
    : { './DuoiChoBatTeamApp': path.join(__dirname, './src/duoi-cho-bat-team-app') },
  remotes: {},
  shared: [{
    react: {
      singleton: true,
      requiredVersion: deps.react,
      shareKey: 'react@18',
    },
    'react-dom': {
      singleton: true,
      requiredVersion: deps['react-dom'],
      shareKey: 'react-dom@18',
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: deps['react-router-dom'],
      shareKey: 'react-router-dom@5',
    },
  }],
});
