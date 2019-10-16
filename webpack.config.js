const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: '[name]-[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // 必须配置的选项，服务启动的目录，默认为跟目录
    contentBase: './dist',
    // 使用热加载时需要设置为 true
    hot: true,
    /**
     * 下面为可选配置
     */
    // 指定使用一个 host。默认是 localhost
    host: 'localhost',
    // 端口号
    port: 8000,
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
    historyApiFallback: {
      disableDotRule: false
    },
    // 出现错误时是否在浏览器上出现遮罩层提示
    overlay: true,
    /**
     * 在 dev-server 的两种不同模式之间切换
     *   默认情况下，应用程序启用内联模式 inline
     *   设置为 false，使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
     */
    inline: true,
    /**
     * 统计信息，枚举类型，可供选项：
     *      "errors-only": 只在发生错误时输出
     *      "minimal": 只在发生错误或有新的编译时输出
     *      "none": 没有输出
     *      "normal": 标准输出
     *      "verbose": 全部输出
     */
    stats: "errors-only",
    // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
    proxy: {
      // '/api/': {
      //     changeOrigin: true,
      //     // 目标地址
      //     target: 'http://localhost:3000',
      //     // 重写路径
      //     pathRewrite: {
      //         '^/api/': '/'
      //     }
      // }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HTMLWebpackPlugin({
    title: 'Webpack startup config',
    template: './public/index.html'
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: '[name]-[hash:8].css',
      allChunks: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   }
        // ]
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  }

}