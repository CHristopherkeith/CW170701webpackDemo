var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    // path: __dirname + "/public",//打包后的文件存放的地方
    path: __dirname + "/build",
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {//在配置文件里添加JSON loader
    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'//在webpack的module部分的loaders里进行配置即可
        /*query: {
          presets: ['es2015','react']
        }*/
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader?modules'//添加对样式表的处理
        loader: ExtractTextPlugin.extract({
        	fallback: 'style-loader',
        	use: 'css-loader?modules'
        })
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("Copyright Flying Unicorns inc."),//在这个数组中new一个就可以了
    new webpack.LoaderOptionsPlugin({
    	options:{
    		postcss: [require('autoprefixer')],
    	}
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("style.css")
    // new ExtractTextPlugin("[name]-[hash].css")
  ],
  devServer: {
    // contentBase: "./public",//本地服务器所加载的页面所在的目录
    // colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}