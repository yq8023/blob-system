import React, { ReactElement, ReactNode } from "react";
import css from "./index.less";

import { Dropdown, Menu } from "antd";
import { ContainerOutlined, PlusOutlined } from "@ant-design/icons";

export interface MenuListProps<T> {
  data: T[];
  menuClick?: (v: any) => void;
  menuItemConfig?: {
    key?: string;
    icon?: ReactNode;
  };
  itemRender: (v: T) => ReactNode;
  onAddClick?: () => void;
}
function MenuList<T extends { id: number }>(props: MenuListProps<T>) {
  const {
    data,
    menuClick,
    menuItemConfig: config,
    itemRender,
    onAddClick,
  } = props;

  return (
    <div className={css["container"]}>
      <div className={css["header"]}>
        <div>
          <ContainerOutlined />
          <span>标签管理</span>
        </div>

        <PlusOutlined className={css["add-icon"]} onClick={onAddClick} />
      </div>
      <Menu
        style={{ width: "200px" }}
        className={css["list-menu"]}
        mode="inline"
        onClick={menuClick}
      >
        {data.map((v) => (
          <Menu.Item
            key={v.id}
            className={css["menu-item"]}
            icon={config?.icon}
          >
            {itemRender(v)}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default MenuList;
