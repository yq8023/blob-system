import React from "react";
import css from "./index.less";

import { CalendarOutlined, TagOutlined } from "@ant-design/icons";

import { Article } from "@/api/blob";
import TagItem from "../tag-item";

import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

interface ArticleItemProps {
  article: Article;
  handleView?: (article: Article) => void;
  handleBack?: () => void;
  is_detail?: boolean;
}
const ArticleItem: React.FC<ArticleItemProps> = (props) => {
  const { article, handleView, handleBack, is_detail = false } = props;
  const mdParser = new MarkdownIt();

  const getTime = () => {
    const date = new Date(article.createdAt!);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
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

      <div
        className={css["content"]}
        style={{ height: is_detail ? "100%" : "250px" }}
      >
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
        {is_detail ? (
          <div
            className={css["read-all"]}
            onClick={() => {
              handleBack?.();
            }}
          >
            {"<< "}返回
          </div>
        ) : (
          <div
            className={css["read-all"]}
            onClick={() => {
              handleView?.(article);
            }}
          >
            查看全文{" >>"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;
