const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/pages/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
          {
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader, 
                { loader: 'css-loader', options: { importLoaders: 1 } },
                'postcss-loader'
            ],
          }, {
            test: /\.(png|jpe?g|gif|woff2|woff|ttf|svg)$/i,
            use: [
              {
                loader: 'file-loader'
              },
            ],
          },
        ]
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: './src/index.html'
          }),
          new MiniCssExtractPlugin()
        ]
};