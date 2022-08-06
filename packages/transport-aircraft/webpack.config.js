const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { exposeModules } = require('../../dynamicFile/index.js');

// 剔除某个对象key
const omitObjKey = (obj, uselessKeys) =>
  Object.keys(obj).reduce((acc, key) => {
    return uselessKeys.includes(key) ? acc : { ...acc, [key]: obj[key] };
  }, {});

module.exports = (env) => {
  const webpack_config = {
    output: {
      // publicPath: 'http://localhost:8001/',
      publicPath: 'auto',
      path: path.resolve(__dirname, './dist'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].js',
      assetModuleFilename: 'static/[hash][ext][query]', // 静态资源放置地址
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.vue', '.jsx', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'packages': path.resolve(__dirname, '../'),
        'pinia': path.resolve(__dirname, '../airport/node_modules/pinia/'),
        // 'element-plus': path.resolve(
        //   __dirname,
        //   '../airport/node_modules/element-plus/'
        // ),
      },
    },

    devServer: {
      port: 8001,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
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
        {
          test: /\.tsx?$/,
          use: [
            'babel-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsSuffixTo: ['\\.vue$'],
                happyPackMode: true,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/,
          type: 'asset/resource', // webpack5不再使用url-loader，改为assetModule
          generator: {
            // 将图片文件输出到 static/imgs 目录中
            // 将图片文件命名 [hash:8][ext][query]
            // [hash:8]: hash值取8位
            // [ext]: 使用之前的文件扩展名
            // [query]: 添加之前的query参数
            filename: 'static/imgs/[hash:8][ext][query]',
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          oneOf: [
            // 这里匹配 `<style module>`
            {
              resourceQuery: /module/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '../../' }, // 由于图片css 是在/static/css 故要返回到根目录
                },
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: {
                      localIdentName: '[local]_[hash:base64:5]',
                    },
                  },
                },
                'postcss-loader',
                'sass-loader',
              ],
            },
            // 这里匹配普通的 `<style>` 或 `<style scoped>`
            {
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: { publicPath: '../../' }, // 由于图片css 是在/static/css 故要返回到根目录
                },
                'css-loader',
                'postcss-loader',
                'sass-loader',
              ],
            },
          ],
        },
      ],
    },

    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
      }),
      new ModuleFederationPlugin({
        name: 'transport_aircraft',
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: exposeModules,
        shared: {
          // vue: {
          //   // singleton: true,
          //   // import: false,
          //   requiredVersion: '^3.0.0',
          // },
          ...require('../../package.json').dependencies,
          ...omitObjKey(require('../airport/package.json').dependencies, [
            '@phy/utils',
          ]),
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
      }),
    ],
  };

  // 生产环境配置
  if (env.WEBPACK_BUILD) webpack_config.plugins.push(new CleanWebpackPlugin());

  return webpack_config;
};
