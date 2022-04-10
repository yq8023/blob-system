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

export function getTagList() {
  return request<CommonPagination<Article>>({
    url: "/article/list",
  });
}

export function addTag(data: AddArticle) {
  return request({
    url: "/article/add",
    method: "post",
    data: data,
  });
}
