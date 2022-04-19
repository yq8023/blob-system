import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routers from "./router";
import BlobInfo from "./pages/blob-info";
import { useRequest } from "ahooks";
import { getInfome } from "./api/blob";

function App() {
  const pathname = window.location.pathname;
  const noValidePath = ["/login"];

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

  // 如果请求
  return (
    <BrowserRouter>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        {data ? (
          <Fragment>
            <BlobInfo />
            {renderRoutes(routers)}{" "}
          </Fragment>
        ) : (
          renderRoutes(routers)
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
