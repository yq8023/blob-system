import { Button } from "antd";
import React from "react";
import css from "./index.less";

const EmptyArticle: React.FC<{ onAddClick: () => void }> = ({ onAddClick }) => {
  return (
    <div className={css["container"]}>
      请先选择左侧文章，或者
      <Button type="link" size={"large"} onClick={onAddClick}>
        去添加
      </Button>
    </div>
  );
};

export default EmptyArticle;
