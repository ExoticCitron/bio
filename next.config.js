const fs = require('fs');
const path = require('path');

module.exports = {
  async redirects() {
    const appDir = path.resolve(__dirname, 'app');
    const directories = fs
      .readdirSync(appDir, { withFileTypes: true })
      .filter(item => item.isDirectory() && item.name !== 'api' && item.name !== 'home')
      .map(item => item.name);

    const redirects = directories.map(dir => ({
      source: `/${dir}`,
      destination: `/@${dir}`,
      permanent: true,
    }));

    return redirects;
  },

  async rewrites() {
    const appDir = path.resolve(__dirname, 'app');
    const directories = fs
      .readdirSync(appDir, { withFileTypes: true })
      .filter(item => item.isDirectory() && item.name !== 'api' && item.name !== 'home')
      .map(item => item.name);

    const rewrites = [
      {
        source: '/',
        destination: '/home',
      },
      ...directories.map(dir => ({
        source: `/@${dir}`,
        destination: `/${dir}`,
      }))
    ];

    return rewrites;
  },

  reactStrictMode: true,
};

