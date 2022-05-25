import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import { createApp } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router).use(ConfigProvider).use(ProLayout).use(PageContainer);

app.mount('#app');
