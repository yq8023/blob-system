export function getToken() {
  const cookieArr = document.cookie?.split(";") ?? [];
  const token = cookieArr.find((item) => /^\s?token=/.test(item)) ?? "";
  return token.split("=")[1] ?? "";
}

// 获取请求的baseurl
export function getRequestBaseUrl() {
  return "http://localhost:8888";
}
