import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import css from "./index.less";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { Article } from "@/api/article";
import { Input } from "antd";
import TagSelect from "@/components/tag/tag-select";
import { Tag } from "@/api/tag";

interface ArticleEditProps {
  article?: Article;
}
const ArticleEdit: React.FC<ArticleEditProps> = ({ article }) => {
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

  const onImageUpload = (file: File) => {
    console.log(file, "file");
  };

  return (
    <div style={{ height: "100%", width: "100%", flex: 1 }}>
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
        style={{ height: "100%", width: "100%" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        view={{ menu: true, md: true, html: true }}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default ArticleEdit;
