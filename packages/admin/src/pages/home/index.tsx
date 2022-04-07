import React, { useState } from "react";
import css from "./index.less";

import { Button, Form, Input, message, Upload } from "antd";
import ImageUpload from "@/common/img-upload";

function Home() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={css["container"]}>
      <header className={css["header"]}>博客后台</header>
      <Form
        name="form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={css["form"]}
      >
        <Form.Item
          label="博客名称"
          name="name"
          rules={[{ required: true, message: "请输入博客名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="简介"
          name="description"
          rules={[{ message: "博客描述" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="头像上传" name="icon">
          <ImageUpload />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 24 }}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Home;
