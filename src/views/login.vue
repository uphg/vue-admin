<template>
  <div class="h-100vh flex items-center justify-center">
    <n-card title="Login" class="w-96">
      <n-form ref="formRef" :model="loginForm" :rules="rules">
        <n-form-item path="username" label="Username">
          <n-input v-model:value="loginForm.username" placeholder="Enter your username" />
        </n-form-item>
        <n-form-item path="password" label="Password">
          <n-input v-model:value="loginForm.password" type="password" placeholder="Enter your password" />
        </n-form-item>
        <n-form-item>
          <n-button
            class="w-full"
            type="primary"
            size="large"
            :loading="loading"
            @click="handleLogin"
          >
            登录
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import { setToken } from '@/utils/token'
import { apiLoagin } from '~mock/login'

interface LoginForm {
  username: string
  password: string
}

const loginForm = ref<LoginForm>({ username: 'admin', password: '123456' })
const formRef = ref<FormInst>()

const loading = ref(false)
const router = useRouter()

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
}

function handleLogin() {
  formRef.value?.validate(async (errors) => {
    if (errors) return
    const response = await apiLoagin(loginForm.value)
    setToken(response?.data.token)
    router.push('/home')
  })
};
</script>
