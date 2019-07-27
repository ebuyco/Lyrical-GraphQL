const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  mode: 'none',
  entry: './client/index.js',
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   // filename: 'bundle.js'
  //   filename: '[name].[hash].js'
  // },
  // can be deleted
  devtool: 'inline-source-map',
  target: 'web',
  devServer: {
    contentBase: '/build',
    hot: true
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false
        }
      },
      {
        use: { loader: 'babel-loader' },
        test: /\.(js|jsx)$/,
        // test: /\.js$/,
        exclude: /(node_modules|bower_components)/
        // query: { compact: false }
      },

      // SASS/SCSS
      {
        test: /\.scss$/,
        use: [

          {
            loader: 'style-loader', options: {
              sourceMap: true
            }
          }, {
            loader: 'css-loader', options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader', options: {
              sourceMap: true
            }
          }]

      },

      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
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

    ]
  },
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
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin([
      {
        from: path.join(process.cwd(), './client/assets'),
        to: path.join(process.cwd(), '/build'),
      },
    ]),
    // new HtmlWebpackPlugin({
    //   template: '../client/index.html'
    // }),

    new HtmlWebpackPlugin({
      template: './client/index.html',
      excludeChunks: ['server']
    }),
    // can be deleted
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    path: path.join(process.cwd(), '/build'),
    publicPath: '/',
    filename: 'bundle.js',
  }
};
