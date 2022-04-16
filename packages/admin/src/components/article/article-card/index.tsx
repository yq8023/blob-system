import React from "react";
import css from "./index.less";

import { Article } from "@/api/article";
import { Tag } from "antd";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

interface ArticleCardProps {
  article: Article;
}
const ArticleCard: React.FC<ArticleCardProps> = (props) => {
  const { article } = props;
  const mdParser = new MarkdownIt();

  const getTime = () => {
    const date = new Date(article.createdAt!);
    return date.toLocaleString();
  };

  return (
    <div className={css["container"]}>
      <div className={css["header"]}>
        <div>{article.title}</div>
        <div>{getTime()}</div>
      </div>
      <div className={css["content"]}>
        <MdEditor
          value={article.content}
          style={{ border: "none", padding: 0 }}
          renderHTML={(text) => mdParser.render(text)}
          view={{ menu: false, md: false, html: true }}
        />
      </div>
      <div className={css["tag"]}>
        {article.tags?.map((v) => (
          <Tag color={v.tag_color} style={{ opacity: 0.6 }} key={v.id}>
            {v.tag_name}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
