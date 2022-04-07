import React, { useState } from "react";
import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

const ImageUpload: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
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
      name="avatar"
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
