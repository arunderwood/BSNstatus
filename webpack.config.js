const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin({ filename: 'css.bundle.css', allChunks: true })
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

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
            template: 'src/index.html',
            inject : 'head'
        }),
        new ManifestPlugin(),
        new OfflinePlugin({
            publicPath: '/',
            relativePaths: true,
        }),
    ]
}
