const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

process.env.NODE_ENV = 'production'

module.exports = function(env, argv) {
  return {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
      filename: '[name].[contenthash:8].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      minimizer: [
        new TerserPlugin(),
        // new OptimizeCSSAssetsPlugin(),
      ],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': '"production"',
      }),
      new webpack.HashedModuleIdsPlugin(),
      new HTMLWebpackPlugin({
        title: 'Webpack startup config',
        template: './public/index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100 * 1000,
                name: 'images/[hash:7].[ext]',
              },
            },
            'image-webpack-loader'
          ]
        },
      ]
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        src: path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src/components'),
      },
    },
  }
}