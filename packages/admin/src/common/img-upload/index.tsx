import React, { useEffect, useState } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import { getRequestBaseUrl, getToken } from "@/api/util";
import { CommonResp } from "@/api/axios";

interface ImageUploadPorps {
  value?: string;
  onChange?: (value?: string) => void;
}

const ImageUpload: React.FC<ImageUploadPorps> = ({ value, onChange }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    value ? `${getRequestBaseUrl()}/${value}` : ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setImageUrl(value ? `${getRequestBaseUrl()}/${value}` : "");
  }, [value]);

  const getBase64 = (img?: RcFile, callback?: (imgUrl: string) => void) => {
    if (!img) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => callback?.(reader.result as string));
    reader.readAsDataURL(img);
  };

  function beforeUpload(file: RcFile) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("仅允许上传 JPG/PNG 文件!");
    }
    return isJpgOrPng;
  }

  const handleChange = (
    info: UploadChangeParam<UploadFile<CommonResp<{ path: string }>>>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
      });

      setLoading(false);
      onChange?.(info.file.response?.result?.path);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      action="http://localhost:8888/user/upload"
      name="file"
      headers={{
        authorization: getToken(),
      }}
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
