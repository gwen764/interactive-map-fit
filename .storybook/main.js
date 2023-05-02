/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-interactions",
    '@storybook/addon-docs'
    //'@storybook/preset-scss'
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, "../src/features/components"),
      '@core': path.resolve(__dirname, "../src/core"),
      '@pages': path.resolve(__dirname, "../src/features/pages"),
      '@assets': path.resolve(__dirname, "../src/assets"),
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react'),
    };
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: 'Documentation'
  },
  staticDirs: ["..\\public"],
  features: {
    emotionAlias: false,
  },
};
export default config;
