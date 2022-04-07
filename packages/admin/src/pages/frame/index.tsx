import React, { Fragment } from "react";
import css from "./index.less";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";

import { NavigationItem } from "@/router";
import { getInfome } from "@/api/user";

const { Sider, Content } = Layout;

const Frame: React.FC<{ navigations: NavigationItem[] }> = (props) => {
  const { navigations, children } = props;
  const pathname = window.location.pathname;
  const noValidePath = ["/login"];
  const navigate = useNavigate();

  const handleActiveUrl = (v: any) => {
    navigate(v.key);
  };

  // 获取用户信息进行校验
  const { data } = useRequest(
    async () => {
      const res = await getInfome();
      return res?.result;
    },
    {
      ready: !noValidePath.includes(pathname),
      onSuccess: (result, params) => {
        if (!result) {
          window.location.href = "/login";
        }
      },
    }
  );

  return (
    <>
      {!data ? (
        children
      ) : (
        <Layout className={css["container"]}>
          <Sider theme="light" className={css["sider"]} collapsible>
            <div className={css["logo"]}>博客后台</div>
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
      )}
    </>
  );
};

export default Frame;
