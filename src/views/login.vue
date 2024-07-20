<template>
  <n-space vertical :size="12">
    <n-card title="Admin Login">
      <n-form ref="formRef" :model="loginForm" :rules="rules">
        <n-form-item path="username" label="Username">
          <n-input v-model:value="loginForm.username" placeholder="Enter your username" />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="loginForm.password" type="password" placeholder="Enter your password" />
        </n-form-item>
        <n-form-item>
          <n-button type="primary" @click="handleLogin">
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui'

interface LoginForm {
  username: string
  password: string
}

const loginForm = ref<LoginForm>({ username: '', password: '' })
const formRef = ref<FormInst>()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}

function handleLogin() {
  formRef.value?.validate((errors) => {
    if (!errors)
      // Handle the login logic here, e.g., call an API
      console.log('Login form is valid', loginForm.value)
    else
      console.error('Login form is invalid', errors)
  })
};
</script>
