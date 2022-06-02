<template>
  <row class="container" type="flex" justify="center" align="middle">
    <div class="main">
      <a-form
        class="user-layout-login"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input v-model:value="formState.username" size="large" placeholder="用户名">
            <template #prefix>
              <user-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input-password v-model:value="formState.password" size="large" placeholder="密码">
            <template #prefix>
              <lock-outlined :style="{ color: 'rgba(0,0,0,.25)' }" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="remember">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
          <a class="forge-passwd" href="">忘记密码？</a>
        </a-form-item>

        <a-form-item>
          <a-button class="login-button" type="primary" html-type="submit" :loading="loading"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </row>
</template>

<script setup lang="ts">
import { Row } from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/pinia/modules/user';
import router from '@/router';

const formState = reactive({
  username: '',
  password: '',
  remember: true,
});

const loading = ref(false);

const onFinish = async (values: any) => {
  loading.value = true;
  const userStore = useUserStore();
  await userStore.login(values).then(flag => {
    if (flag) router.push({ name: 'Index' });
  });
  loading.value = false;
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5 url(@/assets/background.svg) no-repeat 50%;
  background-size: 100%;
}

.main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}

.user-layout-login {
  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }
}

.forge-passwd {
  float: right;
}
</style>
