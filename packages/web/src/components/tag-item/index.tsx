import React from "react";
import css from "./index.less";

import { Tag } from "@/api/blob";

const TagItem: React.FC<{ tag: Tag }> = (props) => {
  const { tag } = props;

  return (
    <a className={css["warpper"]}>
      <div
        className={css["tag-before"]}
        style={{ borderRight: `9px solid ${tag.tag_color}` }}
      ></div>
      <div className={css["tag"]} style={{ backgroundColor: tag.tag_color }}>
        {tag.tag_name}
      </div>
    </a>
  );
};

export default TagItem;
