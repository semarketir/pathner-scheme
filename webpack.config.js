const webpack = require('webpack');
const path = require('path');

const DIR = {
    INPUT: './src',
    OUTPUT: './build'
};

module.exports = {
    target: 'web',
    entry: {
        bundle: `${DIR.INPUT}/index.js`,
        vendors: `${DIR.INPUT}/vendors.js`
    },
    context: __dirname,
    output: {
        path: DIR.OUTPUT,
        filename: '[name].js',
        chunkFilename: '[id].js'
    },
    node: {
        global: true,
        __dirname: true,
        __filename: true,
        process: true,
        Buffer: false
    },
    resolve: {
        root: DIR.INPUT,
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/, /support/, /spec/], loader: 'babel'}
        ]
    }
};
