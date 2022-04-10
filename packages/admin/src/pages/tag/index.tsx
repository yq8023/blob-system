import React, { useState } from "react";
import css from "./index.less";

import { getTagList } from "@/api/tag";
import { useRequest } from "ahooks";
import MenuList from "@/components/menu-list";
import AddTagModal from "@/components/tag/add-tag-modal";
import { TagOutlined } from "@ant-design/icons";

const TagPage: React.FC = () => {
  const [curTag, setCurTag] = useState<number>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // 获取用户信息进行校验
  const { data: tags = [], refresh } = useRequest(async () => {
    const res = await getTagList();
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
        itemRender={(v) => (
          <div>
            <TagOutlined style={{ marginRight: "10px" }} />
            {`${v.tag_name}（${v.articles?.length}）`}
          </div>
        )}
        menuClick={handleMenuClick}
        onAddClick={handleAddClick}
      />
      {/* <ArticleEdit /> */}
      <div>right{curTag}</div>

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
