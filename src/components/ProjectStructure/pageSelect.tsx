import React from 'react';
import { Select } from 'antd';
import { SelectProps } from "antd/lib/select";
const { Option } = Select

interface PageSelectProps extends SelectProps<any> {
  data: Array<{
    desc: string
    key: string
  }>
}
export default ({
  data,
} : PageSelectProps) => (
  <Select style={{
    width: "100%"
  }}>
    {
      data.map(({desc, key}) => <Option key={key} value={key}>{desc}</Option>)
    }
  </Select>
)