import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

const ArticleEdit: React.FC = () => {
  const mdParser = new MarkdownIt();

  const [init, setInit] = useState("aaa");
  function handleEditorChange(data: { html: string; text: string }) {
    console.log("handleEditorChange", data.html, data.text);
  }

  function onImageUpload(file: File) {
    console.log(file, "file");
  }

  return (
    <div>
      <MdEditor
        value={init}
        style={{ height: "500px" }}
        renderHTML={(text) => {
          setInit(text);
          return mdParser.render(text);
        }}
        onChange={handleEditorChange}
        view={{ menu: true, md: true, html: true }}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default ArticleEdit;
