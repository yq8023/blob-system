import React, { ReactNode } from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ReadOutlined, TagOutlined, HomeOutlined } from "@ant-design/icons";
import Frame from "@/pages/frame";
import routes from "./route-config";

export interface NavigationItem {
  label: string;
  link: string;
  icon: ReactNode;
  children?: NavigationItem[];
}

const RouterContainer: React.FC = () => {
  const navigations: NavigationItem[] = [
    {
      label: "首页",
      link: "/",
      icon: <HomeOutlined />,
    },
    {
      label: "文章管理",
      link: "/article",
      icon: <ReadOutlined />,
    },
    {
      label: "标签管理",
      link: "/tag",
      icon: <TagOutlined />,
    },
  ];
  return (
    <BrowserRouter>
      <Frame navigations={navigations}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
        </Routes>
      </Frame>
    </BrowserRouter>
  );
};

export default RouterContainer;
