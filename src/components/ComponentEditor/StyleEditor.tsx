// import React from 'react';
// import { Input, Form, Select } from 'antd';
// import { FormProps } from "antd/lib/form/Form";

// const { Option } = Select

// const displayOptions = [{
//   value: "inline",
//   desc: "内联布局 inline"
// }, {
//   value: "block",
//   desc: "块级布局 block"
// }, {
//   value: "flex",
//   desc: "弹性布局 flex"
// }]

// class Editor extends React.Component<FormProps>{
//   render() {
//     const { form } = this.props;
//     const { getFieldDecorator } = form;
//     return (
//       <Form>
//         <Form.Item label="布局">
//           {getFieldDecorator("display")(
//             <Select>
//               {
//                 displayOptions.map(({value, desc}) => <Option value={value} key={value}>{desc}</Option>)
//               }

//             </Select>
//           )}
//         </Form.Item>
//       </Form>
//     )
//   }
  
// }
import React from 'react';

import { Form, Input, Button, Select } from 'antd';

import { FormInstance } from "antd/lib/form/Form";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface StyleEditor { 
  form: FormInstance
}

const Demo =  (props: StyleEditor) => {
  const { form } = props;
  return (
    <Form {...layout} form={form} name="control-hooks">
      <Form.Item name="note" label="Note" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

    </Form>
  );
};

export default Demo
