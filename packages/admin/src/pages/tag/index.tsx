import React, { useState } from "react";
import css from "./index.less";

import { useRequest } from "ahooks";
import { TagOutlined } from "@ant-design/icons";

import MenuList from "@/components/menu-list";
import AddTagModal from "@/components/tag/add-tag-modal";
import TagDetail from "@/components/tag/tag-detail";

import { getTagList, Tag } from "@/api/tag";
import EmptyTag from "@/components/tag/empty-tag";

const TagPage: React.FC = () => {
  const [curTag, setCurTag] = useState<number>();
  const [tagMap, setTagMap] = useState<Map<number, Tag>>(new Map());
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { data: tags = [], refresh } = useRequest(async () => {
    const res = await getTagList();
    const tagMap = new Map<number, Tag>();
    res?.result?.list.map((v) => {
      tagMap.set(v.id, v);
    });
    setTagMap(tagMap);

    return res?.result?.list;
  });

  const handleMenuClick = (values: any) => {
    setCurTag(Number(values.key));
  };

  const handleAddClick = () => {
    setIsModalVisible(true);
  };

  return (
    <div className={css["container"]}>
      <MenuList
        data={tags}
        headerText={"标签管理"}
        itemRender={(v) => (
          <div>
            <TagOutlined style={{ marginRight: "10px" }} />
            {`${v.tag_name}（${v.articles?.length}）`}
          </div>
        )}
        menuClick={handleMenuClick}
        onAddClick={handleAddClick}
      />
      {curTag ? <TagDetail tag={tagMap.get(curTag) as Tag} /> : <EmptyTag />}

      <AddTagModal
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          refresh();
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </div>
  );
};

export default TagPage;
