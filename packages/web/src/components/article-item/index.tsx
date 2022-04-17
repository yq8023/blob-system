import React from "react";
import css from "./index.less";

import { CalendarOutlined, TagOutlined } from "@ant-design/icons";

import { Article } from "@/api/blob";
import TagItem from "../tag-item";

import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

interface ArticleItemProps {
  article: Article;
}
const ArticleItem: React.FC<ArticleItemProps> = (props) => {
  const { article } = props;
  const mdParser = new MarkdownIt();

  console.log(article);

  const getTime = () => {
    const date = new Date(article.createdAt!);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDay()
    );
  };

  return (
    <div className={css["container"]}>
      <div className={css["title"]}>
        <div>{article.title}</div>
        <div className={css["date"]}>
          <CalendarOutlined style={{ marginRight: 10 }} />
          {getTime()}
        </div>
      </div>

      <div className={css["content"]}>
        <MdEditor
          value={article.content}
          style={{ border: "none", padding: 0 }}
          renderHTML={(text) => mdParser.render(text)}
          view={{ menu: false, md: false, html: true }}
        />
      </div>

      <div className={css["footer"]}>
        <div className={css["tag-box"]}>
          <TagOutlined style={{ marginRight: 10 }} />
          {article.tags?.map((v) => (
            <TagItem key={v.id} tag={v} />
          ))}
        </div>
        <div className={css["read-all"]}>查看全文{" >>"}</div>
      </div>
    </div>
  );
};

export default ArticleItem;
