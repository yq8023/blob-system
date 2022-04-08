import request from "./axios";

export interface User {
  username?: string;
  avatar?: string;
  motto?: string; // 座右铭
  blob_title?: string; // 博客标题
  blob_avatar?: string; // 博客头像
  blob_description?: string; // 博客介绍
}

export function getInfome() {
  return request<User>({
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

export function updateInfo(value: User) {
  return request({
    url: "/user/update",
    method: "post",
    data: value,
  });
}
