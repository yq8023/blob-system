import React, { useEffect, useState } from "react";
import css from "./index.less";

import { useRequest } from "ahooks";
import { Button } from "antd";
import { animated, useSpring } from "react-spring";

import { getArticleList } from "@/api/blob";
import ArticleItem from "@/components/article-item";

const Articles: React.FC = () => {
  const { data: articles = [], refresh } = useRequest(async () => {
    const res = await getArticleList();
    return res?.result?.list;
  });

  return (
    <div className={css["container"]}>
      {articles.map((v) => (
        <ArticleItem key={v.id} article={v} />
      ))}
    </div>
  );
};

export default Articles;
