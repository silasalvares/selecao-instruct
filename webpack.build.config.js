const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: ['@babel/polyfill', './src/assets/entry.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env',
                            {
                                "spec": true
                            }]
                        ]
                    }
                }
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
            chunkFilename: '[id].css'
        }),
        new CopyPlugin([
            { from: 'src/*.html', to: path.join(__dirname, 'dist'), flatten: true }
        ])
    ]
}