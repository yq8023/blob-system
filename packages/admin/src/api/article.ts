import request, { CommonPagination } from "./axios";
import { Tag } from "./tag";

export interface Article {
  id: number;
  title: string;
  content: string;
  read_times: number;
  createdAt?: string;
  updatedAt?: string;
  tags?: Tag[];
}

export interface AddArticle {
  title: string;
  content?: string;
  tag_ids?: number[];
}

export function getArticleList() {
  return request<CommonPagination<Article>>({
    url: "/article/list",
  });
}

export function addArticle(data: AddArticle) {
  return request({
    url: "/article/add",
    method: "post",
    data: data,
  });
}

export function deleteArticle(id: number) {
  return request({
    url: "/article/delete",
    method: "post",
    data: { id },
  });
}

export function uploadImg(file: File) {
  const data = new FormData();
  data.append("file", file);

  return request<{ path: string }>({
    url: "/article/img_upload",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data,
  });
}
