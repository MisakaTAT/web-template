import '@ant-design-vue/pro-layout/dist/style.css';
import 'ant-design-vue/dist/antd.variable.min.css';

import '@/permission';
import App from '@/App.vue';
import router from '@/router';
import { createApp } from 'vue';
import { pinia } from '@/pinia';
import { ConfigProvider } from 'ant-design-vue';
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ConfigProvider);
app.use(ProLayout);
app.use(PageContainer);

app.mount('#app');
