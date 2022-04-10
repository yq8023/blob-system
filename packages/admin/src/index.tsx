import React from "react";
import ReactDOM from "react-dom";
import RouterContainer from "@/router";

import "@/common/css/reset.css";
import "@/common/css/global.less";

// 导入编辑器的样式
import "react-markdown-editor-lite/lib/index.css";

ReactDOM.render(<RouterContainer />, document.getElementById("root"));
