import React from "react";
import css from "./index.less";

import { useRequest } from "ahooks";
import { getInfome } from "@/api/blob";

const BlobInfo: React.FC = () => {
  const { data, refresh } = useRequest(async () => {
    const res = await getInfome();
    return res?.result;
  });

  return (
    <div className={css["container"]}>
      <div className={css["overlay"]}>
        <img
          className={css["avatar"]}
          src={"http://localhost:8888/" + data?.blob_avatar}
        />
      </div>
      <div className={css["content"]}>
        <div className={css["title"]}>{data?.blob_title}</div>
        <div className={css["motto"]}>
          {data?.motto?.split("；").map((v) => (
            <div key={v} className={css["motto-line"]}>
              {v}
            </div>
          ))}
        </div>
        <a className={css["home"]}>主页</a>
      </div>
    </div>
  );
};

export default BlobInfo;
