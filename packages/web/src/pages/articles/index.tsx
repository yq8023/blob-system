import React, { useEffect, useState } from "react";
import css from "./index.less";

import { useRequest } from "ahooks";

import { Article, getArticleList } from "@/api/blob";
import ArticleItem from "@/components/article-item";

const Articles: React.FC = () => {
  const [article, setArticle] = useState<Article>();

  const { data: articles = [], refresh } = useRequest(async () => {
    const res = await getArticleList();
    return res?.result?.list;
  });

  const handleView = (article: Article) => {
    setArticle(article);
  };

  const handleBack = () => {
    setArticle(undefined);
  };

  return (
    <div className={css["container"]}>
      {article ? (
        <ArticleItem
          article={article}
          is_detail={true}
          handleBack={handleBack}
        />
      ) : (
        articles.map((v) => (
          <ArticleItem key={v.id} article={v} handleView={handleView} />
        ))
      )}
    </div>
  );
};

export default Articles;
