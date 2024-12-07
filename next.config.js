const fs = require('fs');
const path = require('path');

module.exports = {
 

  async redirects() {
    // Path to the 'app' directory
    const appDir = path.resolve(__dirname, 'app');

    // Read all subdirectories inside 'app' (excluding 'page.tsx')
    const directories = fs
      .readdirSync(appDir, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);

    // Create a dynamic redirect for each subdirectory
    const redirects = directories.map(dir => ({
      source: `/${dir}`,
      destination: `/@${dir}`, // Redirect to the @version of the directory
      permanent: true, // Permanent redirect (HTTP 301)
    }));

    return redirects;
  },
  async rewrites() {
    // Rewrite /@<folder> to /<folder>
    const appDir = path.resolve(__dirname, 'app');
    const directories = fs
      .readdirSync(appDir, { withFileTypes: true })
      .filter(item => item.isDirectory())
      .map(item => item.name);

    const rewrites = directories.map(dir => ({
      source: `/@${dir}`,
      destination: `/${dir}`,
    }));

    return rewrites;
  },
  reactStrictMode: true,
};
