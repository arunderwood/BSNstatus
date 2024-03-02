const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    entry: {
        main: './src/bsnStatus.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: '[name].js' // name of the generated bundle
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$|\.woff|woff2$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins : [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/images', to: 'images' },
            ],
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'
        }), 
        new HtmlWebpackPlugin({
            favicon: 'src/images/favicon.png',
            template: 'src/index.html',
            inject: true,
            minify: true
        }),
        new WebpackPwaManifest({
            inject: true,
            fingerprints: false,
            filename: 'manifest.json',
            name: 'BSNstatus',
            short_name: 'BSNstatus',
            description: 'A responsive webapp that organizes site bookmarks and other useful data into a grid of cards.',
            theme_color: '#ff9800',
            background_color: '#ffffff',
            orientation: 'portrait',
            publicPath: '/',
            display: 'standalone',
            start_url: '.',
            author: 'Arunderwood',
            developer: {
                name: 'Arunderwood',
                'url': 'https://github.com/arunderwood'
            },
            homepage_url: 'https://github.com/arunderwood/BSNstatus',
            default_locale: 'en',
            icons: [
                {
                    src: path.resolve('src/images/favicon.png'),
                    sizes: [96, 128, 144, 192, 256, 384, 512] // multiple sizes
                }
            ]
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
}
