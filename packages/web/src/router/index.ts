import { RouteConfig } from "react-router-config";

import Articles from "@/pages/articles";
import Login from "@/pages/login";

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Articles,
  },
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
