import type { ResponseData } from '@/shared/http'
import { apiGetUserInfo } from '~mock/getUserInfo'

export async function setUserInfo() {
  const res = await apiGetUserInfo('admin-token') as ResponseData<UserInf>
  if (res.code === 200) {
    state.setUser(res.data!)
  }
}
