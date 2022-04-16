import React, { ChangeEvent, useEffect, useState } from "react";
import css from "./index.less";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { addArticle, Article, deleteArticle, uploadImg } from "@/api/article";
import { Button, Input, message } from "antd";
import TagSelect from "@/components/tag/tag-select";
import { Tag } from "@/api/tag";

interface ArticleEditProps {
  mode?: "add" | "edit";
  article?: Article;
  onSave?: () => void;
}
const ArticleEdit: React.FC<ArticleEditProps> = ({ article, onSave, mode }) => {
  const mdParser = new MarkdownIt();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setContent(article?.content);
      setTags(article.tags || []);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
    }
  }, [article]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTagChange = (tags: Tag[]) => {
    setTags(tags);
  };
  const handleEditorChange = (data: { html: string; text: string }) => {
    setContent(data.text);
  };

  const onImageUpload = async (file: File, callback: (url: string) => void) => {
    const resp = await uploadImg(file);
    if (resp?.result) {
      callback(resp.result.path);
    } else {
      message.error("上传图片出错");
    }
  };

  const handleSave = async () => {
    try {
      const newArticle = article?.id
        ? {
            id: article.id,
            title,
            content,
            tag_ids: tags.map((v) => v.id),
          }
        : {
            title,
            content,
            tag_ids: tags.map((v) => v.id),
          };
      const resp = await addArticle(newArticle);
      message.success("添加文章成功！");
      onSave?.();
    } catch (error) {
      message.error("添加文章失败！");
    }
  };

  const handleDelete = async () => {
    try {
      if (!article?.id) return;
      const resp = await deleteArticle(article?.id);
      onSave?.();
    } catch (error) {
      message.error("删除文章失败！");
    }
  };

  return (
    <div className={css["container"]}>
      <div className={css["header"]}>
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="请输入文章标题"
          bordered={false}
        />
      </div>
      <TagSelect tags={tags} handleTagChange={handleTagChange} />
      <MdEditor
        value={content}
        className={css["editor-box"]}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        view={{ menu: true, md: true, html: true }}
        onImageUpload={onImageUpload}
      />

      <div className={css["options"]}>
        {mode === "edit" && (
          <Button
            type="primary"
            danger
            style={{ marginRight: 10 }}
            onClick={handleDelete}
          >
            删除文章
          </Button>
        )}
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default ArticleEdit;
