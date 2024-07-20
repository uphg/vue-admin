import { createRequest } from './create'

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo(token: string) {
  return createRequest(token
    ? {
        code: 200,
        data: {
          userId: 1,
          name: 'Admin',
          rules: ['admin'],
          email: 'admin@example.com',
        },
      }
    : {
        code: 401,
        message: '未登录',
      })
}
