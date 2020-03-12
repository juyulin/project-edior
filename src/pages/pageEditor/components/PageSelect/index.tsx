import React from 'react';
import { Select, Form  } from 'antd';
import { FormInstance } from 'antd/lib/form'
import { Page } from '../../../../types/project'
const { Option } = Select;

export interface Values {
  path?: string | undefined;
}

interface PageSelectProps {
  form: FormInstance;
  data: Array<Page>;
  onChange?: Function;
}

export default (props: PageSelectProps) => {
  const { data, form } = props;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  
  return (
    <Form
      {...formItemLayout}
      form={form}
      // onValuesChange={(changedValues, allValues) => {
      //   onChange(allValues)
      // }}
    >
      <Form.Item 
        name="path"
        label="路由"
      >
        <Select >
        {
          data.map(({ path }) => <Option value={path} key={path}>{path}</Option>)
        }
      </Select>
      </Form.Item>
      
    </Form>
    
  )
}