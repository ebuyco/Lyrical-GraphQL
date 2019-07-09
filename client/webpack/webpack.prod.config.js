import HtmlWebpackPlugin from 'html-webpack-plugin';

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./config');

const prodConfig = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\/.js$/,
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        type: 'javascript/autos'
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify('production')
        },
      },
    }),
    new HtmlWebpackPlugin({
      from: path.join(process.cwd(), './client/assets'),
      to: path.join(process.cwd(), 'build'),
    }),
    new CopyPlugin([
      {
        from: path.join(process.cwd(), './client/assets'),
        to: path.join(process.cwd(), '/build'),
      },
    ])
  ],
  output: {
    path: path.join(process.cwd(), '/build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    hot: true,
  }
};

module.exports = {
  ...baseConfig,
  ...prodConfig
};
