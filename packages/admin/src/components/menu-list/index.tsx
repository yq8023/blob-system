import React, { ReactElement, ReactNode } from "react";
import css from "./index.less";

import { Dropdown, Menu } from "antd";
import { ContainerOutlined, PlusOutlined } from "@ant-design/icons";

export interface MenuListProps<T> {
  data: T[];
  headerText: string;
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
    headerText,
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
          <span>{headerText}</span>
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
          <Menu.Item key={v.id} icon={config?.icon}>
            {itemRender(v)}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}

export default MenuList;
