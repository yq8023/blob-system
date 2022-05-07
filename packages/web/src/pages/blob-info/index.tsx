import React from "react";
import css from "./index.less";

import { useRequest } from "ahooks";
import { getBlogInfo } from "@/api/blob";

const BlobInfo: React.FC = () => {
  const { data, refresh } = useRequest(async () => {
    const res = await getBlogInfo();
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

      <div className={css["music"]}>
        <iframe
          frameBorder="no"
          marginWidth={0}
          marginHeight={0}
          width="230"
          height="86"
          src="//music.163.com/outchain/player?type=2&id=167850&auto=1&height=66"
        ></iframe>
      </div>
    </div>
  );
};

export default BlobInfo;
