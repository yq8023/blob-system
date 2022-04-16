import React, { useState } from "react";
import css from "./index.less";

import { Spin } from "antd";
import { useRequest } from "ahooks";
import { Article, getArticleList } from "@/api/article";
import MenuList from "@/components/menu-list";
import ArticleEdit from "@/components/article/article-edit";
import EmptyArticle from "@/components/article/empty-article";

enum Status {
  Add = "add",
  Edit = "edit",
  Empty = "empty",
}

const ArticlePage: React.FC = () => {
  // 当前选中的文章id
  const [curArticle, setCurArticle] = useState<number>();
  // 文章map集合
  const [articleMap, setArticleMap] = useState<Map<number, Article>>(new Map());
  // 当前页面的状态
  const [status, setStatus] = useState<Status>(Status.Empty);

  const {
    data: articles = [],
    refresh,
    loading,
  } = useRequest(async () => {
    const res = await getArticleList();
    const articleMap = new Map<number, Article>();
    res?.result?.list.map((v) => {
      articleMap.set(v.id, v);
    });
    setArticleMap(articleMap);
    return res?.result?.list;
  });

  const handleMenuClick = (values: any) => {
    setCurArticle(Number(values.key));
    setStatus(Status.Edit);
  };

  const handleAddClick = () => {
    setStatus(Status.Add);
  };

  const getRightContentByStatus = () => {
    if (status === Status.Empty) {
      return <EmptyArticle onAddClick={handleAddClick} />;
    } else if (status === Status.Add) {
      return <ArticleEdit onSave={refresh} mode="add" />;
    } else if (status === Status.Edit) {
      if (!curArticle) return <EmptyArticle onAddClick={handleAddClick} />;
      return (
        <ArticleEdit
          mode="edit"
          article={articleMap.get(curArticle) as Article}
          onSave={refresh}
        />
      );
    }
  };
  return (
    <Spin spinning={loading}>
      <div className={css["container"]}>
        <MenuList
          data={articles}
          headerText={"文章管理"}
          itemRender={(v) => (
            <div className={css["header"]}>
              <div className={css["title"]}>{v.title}</div>
              <div className={css["article-date"]}>
                {new Date(v.createdAt!).toLocaleString()}
              </div>
            </div>
          )}
          menuClick={handleMenuClick}
          onAddClick={handleAddClick}
        />

        {getRightContentByStatus()}
      </div>
    </Spin>
  );
};

export default ArticlePage;
