import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routers from "./router";
import BlobInfo from "./pages/blob-info";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
        <BlobInfo />
        {renderRoutes(routers)}
      </div>
    </BrowserRouter>
  );
}

export default App;
