import { RouteConfig } from "react-router-config";

import Articles from "@/pages/articles";

const routes: RouteConfig[] = [
  {
    path: "/",
    exact: true,
    component: Articles,
  },
];

export default routes;
