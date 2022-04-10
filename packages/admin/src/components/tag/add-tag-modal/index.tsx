import React from "react";
import { Form, Input, message, Modal } from "antd";
import { addTag } from "@/api/tag";

export interface AddTagModalProps {
  visible: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}
const AddTagModal: React.FC<AddTagModalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const res = await addTag(values);
      message.success(res?.message);
      onOk?.();
    } catch (errorInfo: any) {
      errorInfo.message && message.error(errorInfo.message);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <Modal
      title="添加标签"
      visible={visible}
      okText="保存"
      cancelText="取消"
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="标签名称"
          name="tag_name"
          rules={[{ required: true, message: "标签名不能为空" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTagModal;
