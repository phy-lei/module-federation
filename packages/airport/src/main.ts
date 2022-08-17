import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import router from './router/index';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from './App.vue';
import 'element-plus/dist/index.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) app.component(key, component);

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router).mount('#app');
