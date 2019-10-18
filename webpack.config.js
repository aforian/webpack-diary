const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function cssLoader() {
  if (process.env.NODE_ENV === 'production') {
    return {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          }
        ]
      })
    };
  } else {
    return {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          }
        },
      ]
    };
  }
}

function productionPlugin() {
  return process.env.NODE_ENV === 'production'
    ? [
      new ExtractTextPlugin({
        filename: '[name]-[hash:8].css',
        allChunks: true,
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true,
          map: { inline: false }
        }
      }),
    ]
    : [];
}

module.exports = function(env, argv) {
  return {
    devtool: 'inline-source-map',
    entry: './src/index.js',
    output: {
      filename: '[name]-[hash:8].js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      // 虛擬伺服器啟動目錄
      contentBase: './dist',
      // 是否啟用hot-reload
      hot: true,
      // 指定使用host與port。預設值是 localhost:8000
      host: 'localhost',
      port: 8000,
      // 當使用 HTML5 History API 時，所有的 404 response會導向index.html。disableDotRule選擇是否啟用
      historyApiFallback: {
        disableDotRule: false
      },
      // 出現錯誤時是否在瀏覽器上出現遮罩層提示
      overlay: true,
      inline: true,
      /**
       * 統計信息，可用選項：
       *      "errors-only": 只在發生錯誤時輸出
       *      "minimal": 只在發生錯誤或有新的編譯時輸出
       *      "none": 沒有輸出
       *      "normal": 標準輸出
       *      "verbose": 全部輸出
       */
      stats: "errors-only",
      // 設置接口請求代理，更多 proxy 配置可參考 https://github.com/chimurai/http-proxy-middleware#options
      proxy: {}
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HTMLWebpackPlugin({
        title: 'Webpack startup config',
        template: './public/index.html'
      }),
      new CleanWebpackPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      ...productionPlugin(),
      // new ExtractTextPlugin({
      //   filename: '[name]-[hash:8].css',
      //   allChunks: true,
      // }),

    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: path.resolve(__dirname, 'src'),
        },

        cssLoader(),
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: [
        //       {
        //         loader: 'css-loader',
        //         options: {
        //           sourceMap: true
        //         }
        //       }
        //     ]
        //   })
        // },
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
      }
    }
  }
}