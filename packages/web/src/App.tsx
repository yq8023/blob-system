import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import Articles from "@/pages/articles";

import routers from "./router";
import BlobInfo from "./pages/blob-info";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <BlobInfo />
        <Articles />
        {/* 暂时不用路由 */}
        {/* {renderRoutes(routers)} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
