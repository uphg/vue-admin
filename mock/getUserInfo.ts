import { createRequest } from './create'

/**
 * 获取用户信息
 * @returns object
 */
export function apiGetUserInfo(token: string) {
  console.log('getUserInfo')
  return createRequest(token
    ? {
        code: 200,
        data: {
          id: 1,
          name: 'Admin',
          rules: ['admin'],
          email: 'admin@example.com',
        },
      }
    : {
        code: 401,
        message: '未登录',
      }, 'success', { loading: true })
}
