const isDev = process.env.NODE_ENV === 'development';

const baseUrl = 'http://192.168.3.176:8888';
const prodUrl = 'http://192.168.3.176:8888'; // 生产环境url

export default {
  baseUrl: isDev ? '/api' : prodUrl,
  proxyUrl: baseUrl,
  prodUrl,
};
