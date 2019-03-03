/* eslint-disable */
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
const Visualizer = require('webpack-visualizer-plugin');
const pkg = require('./package.json');

const webpackConfig = getWebpackConfig(false);
webpackConfig.forEach((config, index) => {
    for (const key in config.entry.keys) {
        config.entry.key = ['./components/index.tsx'];
    }

    if (index === 0) {
        config.plugins.push(
            new Visualizer({
                filename: `../analysis/${pkg.name}@${pkg.version}-stats.html`,
            }),
        );
    }
});

module.exports = webpackConfig;
