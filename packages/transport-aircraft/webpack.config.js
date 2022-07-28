const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  output: {
    publicPath: 'http://127.0.0.1:8081/',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.vue', '.jsx', '.js', '.json'],
  },

  optimization: {
    runtimeChunk: 'single',
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // {
      //   test: /\.tsx?$/,
      //   use: [
      //     'babel-loader',
      //     {
      //       loader: 'ts-loader',
      //       options: {
      //         transpileOnly: true,
      //         appendTsSuffixTo: ['\\.vue$'],
      //         happyPackMode: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new ModuleFederationPlugin({
      name: 'transport_aircraft',
      filename: 'remoteEntry.js',

      exposes: {
        './About': './src/modules/About/About.vue',
      },
      shared: {
        vue: {
          // singleton: true,
          // import: false,
          requiredVersion: '^3.0.0',
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};