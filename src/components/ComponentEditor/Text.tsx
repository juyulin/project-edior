import React from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from "antd/lib/form/Form";



export interface EditorProps  {
  form: FormInstance
}

export default (props: EditorProps) => {
  const { form } = props
  return (
    <Form form={form}>
      <Form.Item
        label="文字"
        name="value"
      >
        <Input />
      </Form.Item>
    </Form>
  )
}