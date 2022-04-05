import React, { Fragment } from "react";
import css from "./index.less";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

import { NavigationItem } from "@/router";

const { Sider, Content } = Layout;

const Frame: React.FC<{ navigations: NavigationItem[] }> = (props) => {
  const { navigations, children } = props;

  const navigate = useNavigate();

  const handleActiveUrl = (v: any) => {
    navigate(v.key);
  };

  return (
    <Layout className={css["container"]}>
      <Sider theme="light" className={css["sider"]} collapsible>
        <div className={css["logo"]}>博客后台系统</div>
        <Menu
          defaultSelectedKeys={[navigations[0].link]}
          onClick={handleActiveUrl}
          mode="inline"
        >
          {navigations.map((v, i) => (
            <Fragment key={v.link}>
              <Menu.Item key={v.link} icon={v.icon}>
                {v.label}
              </Menu.Item>
              {i === 0 && <Menu.Divider />}
            </Fragment>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Frame;
