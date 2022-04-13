import React, { Fragment } from "react";
import css from "./index.less";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

import { NavigationItem } from "@/router";
import { getInfome } from "@/api/user";
import { UserContext } from "@/context/user-context";

const { Sider, Content } = Layout;

const Frame: React.FC<{ navigations: NavigationItem[] }> = (props) => {
  const { navigations, children } = props;
  const pathname = window.location.pathname;
  const noValidePath = ["/login"];
  const navigate = useNavigate();

  const handleActiveUrl = (v: any) => {
    navigate(v.key);
  };

  const getActiveKey = () => {
    return `/${pathname.split("/")[1]}`;
  };

  // 获取用户信息进行校验
  const { data, refresh } = useRequest(
    async () => {
      const res = await getInfome();
      return res?.result;
    },
    {
      ready: !noValidePath.includes(pathname),
    }
  );

  // 如果请求到用户信息后，进行全局context注入
  return (
    <>
      {!data ? (
        children
      ) : (
        <UserContext.Provider value={{ userInfo: data, refresh: refresh }}>
          <Layout className={css["container"]}>
            <Sider theme="light" className={css["sider"]} collapsible>
              <div className={css["logo"]}>博客后台</div>
              <Menu
                defaultSelectedKeys={[getActiveKey()]}
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
        </UserContext.Provider>
      )}
    </>
  );
};

export default Frame;
