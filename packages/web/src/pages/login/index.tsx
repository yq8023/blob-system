import React from "react";
import css from "./index.less";

import { Button, Form, Input, message } from "antd";
import { login } from "@/api/blob";

const Login: React.FC = () => {
  const onFinish = async (values: any) => {
    try {
      const res = await login(values.username, values.password);
      message.success("登录成功!");
      window.location.href = "/";
    } catch (error) {
      message.error("登录错误!");
    }
  };

  return (
    <div className={css["container"]}>
      <header className={css["header"]}>博客前台</header>
      <Form
        name="form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className={css["form"]}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "用户名不能为空" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input type={"password"} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button type="link" htmlType="submit">
            忘记密码
          </Button>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
