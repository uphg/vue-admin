import type { ResponseData } from '@/shared/http'
import { getUserInfo } from '~mock/getUserInfo'

export async function setUserInfo() {
  const res = await getUserInfo('admin-token') as ResponseData<UserInf>
  if (res.code === 200) {
    state.setUser(res.data!)
  }
}
