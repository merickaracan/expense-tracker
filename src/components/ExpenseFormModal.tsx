import React, { useState } from 'react';
import { DatePicker, Input, Form, InputNumber, Modal } from 'antd';

interface ModalComponents{
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values:any) => void;
}

export const ExpenseFormModal: React.FC<ModalComponents> = ( {visible, onCancel, onSubmit} ) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try{
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } 
    catch (err){
    }
  };

  return (
    <Modal
      title="Enter Expenses"
      open={visible}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Add Expense"
      cancelText="Cancel"
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="expenseCategory" label="Category" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="dateOfExpense" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="expenseDescription" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="departmentNames" label="Departments ">
          <Input />
        </Form.Item>
        <Form.Item name="Number" label="Amount" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExpenseFormModal;