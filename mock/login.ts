import { createRequest } from './create'

export function login(params: { username: string, password: string }) {
  console.log('login')
  const { username, password } = params
  return createRequest(
    username === 'admin' && password === '123456'
      ? { code: 200, data: { token: 'admin-token' } }
      : { code: 401, message: '账号或密码错误' },
  )
}
