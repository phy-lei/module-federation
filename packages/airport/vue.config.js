const { defineConfig } = require('@vue/cli-service');
const { ModuleFederationPlugin } = require('webpack').container;
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // static: {
    //   directory: path.join(__dirname),
    // },
    // compress: true,
    host: '127.0.0.1',
    port: 8080,
    hot: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  chainWebpack: (config) => {
    // console.log('configureWebpack', config.plugins.get('html'));
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .tap((options) => {
    //     return {
    //       ...options,
    //       refSugar: true
    //     };
    //   });
    // config.plugin('html').tap(args => {
    //   args[0].scriptLoading = 'module'
    //   return [...args]
    // });
  },
  configureWebpack: {
    plugins: [
      new ModuleFederationPlugin({
        name: 'airport',
        filename: 'remoteEntry.js',
        // library: {type: 'module'},

        remotes: {
          remote: 'transport_aircraft@http://127.0.0.1:8081/remoteEntry.js',
        },
        // remoteType:'module',
        // shared: {
        //   vue: {
        //     // singleton: true,
        //     // import: false,
        //     requiredVersion: '^3.0.0',
        //   },
        // },
      }),
    ],
  },
});
