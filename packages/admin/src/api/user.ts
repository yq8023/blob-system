import request from "./axios";

export function getInfome() {
  return request<{ username: string }>({
    url: "/user/me",
  });
}

export function login(username: string, password: string) {
  return request<{ token: string }>({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
}
