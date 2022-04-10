import request, { CommonPagination } from "./axios";
import { Article } from "./article";

export interface Tag {
  id: number;
  tag_name: string;
  articles?: Article[];
}

export function getTagList() {
  return request<CommonPagination<Tag>>({
    url: "/tag/list",
  });
}

export function addTag(tag_name: string) {
  return request<{ tag_name: string }>({
    url: "/tag/add",
    method: "post",
    data: tag_name,
  });
}
