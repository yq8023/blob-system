import React, { ReactNode } from "react";
import Home from "@/pages/home";
import Login from "@/pages/login";
import ArticlePage from "@/pages/article";
import TagPage from "@/pages/tag";

interface RouteItem {
  path: string;
  exact?: boolean;
  component: React.FC;
}
const routes: RouteItem[] = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/tag",
    component: TagPage,
  },
  {
    path: "/article",
    component: ArticlePage,
  },
];
export default routes;
