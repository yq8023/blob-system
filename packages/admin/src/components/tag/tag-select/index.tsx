import React from "react";
import css from "./index.less";
import { TagsOutlined } from "@ant-design/icons";
import { getTagList, Tag } from "@/api/tag";
import { Select, Tag as TagComp } from "antd";
import { useRequest } from "ahooks";

const { Option } = Select;

interface TagSelectProps {
  tags?: Tag[];
  handleTagChange?: (values: Tag[]) => void;
}

const TagSelect: React.FC<TagSelectProps> = (props) => {
  const { tags = [], handleTagChange } = props;

  const { data: tagList = [], refresh } = useRequest(async () => {
    const res = await getTagList();
    return res?.result?.list;
  });

  const handleChange = (checkedValue: number[], option: any) => {
    handleTagChange?.(tagList.filter((v) => checkedValue.includes(v.id)));
  };

  return (
    <div className={css["container"]}>
      <TagsOutlined style={{ fontSize: 22, marginRight: 8 }} />

      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="添加标签"
        value={tags.map((v) => v.id)}
        onChange={handleChange}
      >
        {tagList.map((v) => (
          <Option key={v.id} value={v.id}>
            <TagComp color={v.tag_color} style={{ opacity: 0.6 }}>
              {v.tag_name}
            </TagComp>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default TagSelect;
