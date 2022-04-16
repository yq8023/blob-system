import { Button } from "antd";
import React from "react";
import css from "./index.less";

const EmptyTag: React.FC = () => {
  return <div className={css["container"]}>请先选择左侧标签</div>;
};

export default EmptyTag;
