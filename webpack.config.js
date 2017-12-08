const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin({ filename: 'css.bundle.css', allChunks: true })
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')


module.exports = {
    entry: {
        main: './src/bsnStatus.js', // bundle's entry point
        vendor: './src/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // output directory
        filename: '[name].js' // name of the generated bundle
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
                loader: 'file?name=[name].[ext]'
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: extractCSS.extract({ // Instance 1
                    fallback: 'style-loader',
                    use: [ 'css-loader' ]
                })
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$|\.woff|woff2$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]?[hash]',
                    options: {
                        publicPath: '/'
                    }
                }]
            },
        ]
    },
    plugins : [
        new CopyWebpackPlugin([
            // {output}/to/file.txt
            { from: 'src/images', to: 'images' }
        ]),
        extractCSS,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false,
            },
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
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
            inject: 'head',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new WebpackPwaManifest({
            inject: true,
            fingerprints: false,
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
        new OfflinePlugin({
            publicPath: '/',
            relativePaths: true,
        })
    ]
}
