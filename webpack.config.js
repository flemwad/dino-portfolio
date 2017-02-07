'use strict';

var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var IS_WEBPACK_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') !== -1;

var argv = require('yargs').config({
    dev: true,
    deploy: false
}).argv;

//Is a dev server build, should never deploy
if (IS_WEBPACK_DEV_SERVER) {
    argv.dev = true;
    argv.deploy = false;
}

var env = (argv.dev) ? 'prod' : 'dev';
var envConfig = JSON.parse(JSON.stringify(require('./env.configs')[env]));

if (argv.deploy) argv.dev = false;

var outputPath = '';
if (argv.dev) outputPath = path.join(__dirname, 'dist', 'dev');
else outputPath = path.join(__dirname, 'dist', 'prod');

var PATHS = {
    src: path.join(__dirname, 'app'),
    output: outputPath
};

console.log('sourcing build from: ' + PATHS.src);
console.log('outputting build to: ' + PATHS.output);

var config = {
    bail: !IS_WEBPACK_DEV_SERVER, // Non DEV SERVER builds should 'bail' (exit immediately) upon error
    context: PATHS.src,
    entry: {
        app: ['./index.js']
    },
    output: {
        path: PATHS.output,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /index.html$/,
                loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader?' + JSON.stringify({
                    root: PATHS.src,
                    attrs: ['img:src', 'link:href']
                })
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                loader: 'url-loader?limit=100000&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.js$/,
                loader: 'ng-annotate-loader?add=true&remove=true&single_quotes=true',
                exclude: /(node_modules|\.test.js|\.factories.js)/
            },
            {
                test: /\.html$/,
                loader: 'ngtemplate-loader?relativeTo=' + (PATHS.src) + '/!html-loader',
                exclude: [
                    /index.html$/
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                loader: 'file-loader?name=assets/img/[name].[ext]'
            }
        ]
    },
    htmlLoader: {
        root: PATHS.src + '/assets',
        attrs: ['img:src', 'link:href']
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(envConfig)
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            '_': 'lodash'
        })
    ]
};

config.devtool = argv.dev ? 'eval-source-map' : 'source-map';

if (!IS_WEBPACK_DEV_SERVER) config.plugins.unshift(new CleanWebpackPlugin([PATHS.output]));

if (argv.dev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    //Note that a bug in chrome prevents devtool sourcemap from reloading on hot module updates
    // https://github.com/webpack/webpack/issues/2478
    //Using Alt + R when focused on the Chrome devtools will auto reload them for you
    config.devServer = {
        contentBase: PATHS.src,
        watchContentBase: true,
        clientLogLevel: 'error',
        inline: true,
        quiet: false,
        noInfo: false,
        filename: 'bundle.js',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        port: 4000
    };
}

if (argv.deploy) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: false,
        mangle: false //TODO: Only way to mangle is to not use ng-annotate, e.g. explicitly define injected params
    }));
}

if (argv.deploy) config.plugins.push(new pmPlugins.CleanMapsPlugin({outputPath: PATHS.output}));

module.exports = config;
