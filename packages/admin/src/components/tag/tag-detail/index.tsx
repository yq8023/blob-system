import React from "react";
import css from "./index.less";

import { Tag } from "@/api/tag";
import { List } from "antd";
import ArticleCard from "@/components/article/article-card";

interface TagDetailProps {
  tag: Tag;
}
const TagDetail: React.FC<TagDetailProps> = (props) => {
  const { tag } = props;

  return (
    <div className={css["container"]}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          style: { marginRight: 20 },
          pageSize: 2,
        }}
        dataSource={tag.articles || []}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ArticleCard article={item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TagDetail;
