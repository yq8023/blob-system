import request, { CommonPagination } from "./axios";

export interface Tag {
  id: number;
  tag_name: string;
  tag_color: string;
  articles?: Article[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  read_times: number;
  createdAt?: string;
  updatedAt?: string;
  tags?: Tag[];
}

export interface User {
  username?: string;
  avatar?: string;
  motto?: string; // 座右铭
  blob_title?: string; // 博客标题
  blob_avatar?: string; // 博客头像
  blob_description?: string; // 博客介绍
}

export function getBlogInfo() {
  return request<User>({
    url: "/user/getBlogInfo",
  });
}

export function getArticleList() {
  return request<CommonPagination<Article>>({
    url: "/article/list",
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
