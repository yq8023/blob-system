import React, { useContext, useEffect } from "react";
import css from "./index.less";

import { Button, Form, Input, message } from "antd";
import ImageUpload from "@/common/img-upload";
import { UserContext } from "@/context/user-context";
import { updateInfo, User } from "@/api/user";

function Home() {
  const { userInfo, refresh } = useContext(UserContext);
  const form = Form.useForm()[0];

  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  const onFinish = async (values: User) => {
    const res = await updateInfo(values);
    message.success("信息更新成功！");
    refresh();
  };

  return (
    <div className={css["container"]}>
      <header className={css["header"]}>博客后台</header>
      <Form
        name="form"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={css["form"]}
      >
        <Form.Item
          label="博客名称"
          name="blob_title"
          rules={[{ required: true, message: "请输入博客名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="座右铭" name="motto">
          <Input />
        </Form.Item>

        <Form.Item label="博客简介" name="blob_description">
          <Input />
        </Form.Item>

        <Form.Item label="头像上传" name="blob_avatar">
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
