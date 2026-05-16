// production config
const { merge } = require('webpack-merge')
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    context: resolve(__dirname, '../../src'),
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.tsx?$/],
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', { loader: 'css-loader' /*, options: {modules: true}*/ }],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader' /*, options: {modules: true}*/ },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                silenceDeprecations: ['legacy-js-api', 'import', 'function-units', 'slash-div', 'global-builtin'],
                                quietDeps: true,
                            },
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'icons/[hash][ext][query]',
                },
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin()],
    performance: {
        hints: false,
    },
}

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: ['@babel/polyfill', './js/web_modules/index.tsx'],
    devtool: 'source-map',
    output: {
        //filename: 'js/bundle.[fullhash].min.js',
        filename: 'js/web_modules.min.js',
        path: resolve(__dirname, '../../../dist/'),
        publicPath: '/',
    },
    plugins: [],
})
