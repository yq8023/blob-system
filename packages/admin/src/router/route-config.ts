import React, { ReactNode } from "react";
import App from "@/App";
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
    component: App,
  },
  {
    path: "/article",
    component: ArticlePage,
  },
  {
    path: "/tag",
    component: TagPage,
  },
];
export default routes;
