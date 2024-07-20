import { createRequest } from "./create";

// logout mock:
export function logout() {
  return createRequest({ code: 200, message: '退出成功！' })
}
