const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@core': 'src/core',
    '@features': 'src/features',
    '@pages': 'src/features/pages',
    '@components': 'src/features/components',
    '@assets': 'src/assets',
  })(config);

  return config;
};