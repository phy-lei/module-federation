const path = require('path');
const fs = require('fs');
const outputPath = path.resolve(__dirname, '../dynamicFile/index.js');

const remoteModulePath = path.resolve(
  __dirname,
  '../packages/transport-aircraft/src/modules'
);

const files = fs.readdirSync(remoteModulePath);

console.log(
  '%c [ xxx ]',
  'font-size:13px; background:pink; color:#bf2c9f;',
  process.env.MODE_ENV
);

// 生成远程模块 webpack的expose
const generateExposesModules = () => {
  return Array.from(files).reduce((acc, cur) => {
    acc[`./${cur}`] = path.resolve(
      __dirname,
      `${remoteModulePath}/${cur}/${cur}.vue`
    );
    return acc;
  }, {});
};

const exposeModules = generateExposesModules();

// 远程组件模式
const remoteFileContent = `

const modulesRoute = [${files
  .map((file) => {
    return `{
      path: '/${file}',
      name: '${file}',
      component: () => import('remote/${file}'),
    },`;
  })
  .join('\n')}]


module.exports = {
  exposeModules: ${JSON.stringify(exposeModules)},
  modulesRoute,
}

`;

// 普通组件模式
const normalFileContent = `

const modulesRoute = [${files
  .map((file) => {
    return `{
      path: '/${file}',
      name: '${file}',
      component: () => import('packages/transport-aircraft/src/modules/${file}/${file}.vue'),
    },`;
  })
  .join('\n')}]


module.exports = {
  exposeModules: ${JSON.stringify(exposeModules)},
  modulesRoute,
}

`;

const serveModeMap = {
  remote: remoteFileContent,
  normal: normalFileContent,
};

fs.writeFileSync(
  outputPath,
  serveModeMap[process.env.MODE_ENV] ? serveModeMap[process.env.MODE_ENV] : ''
);
