import React from 'react';
import * as Antd from 'antd'

const ComponentMap = {
  'antd': {
    Input: {
      component: Antd.Input,
      props: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "age": {
            "type": "number"
          }
        }
      }
    }
  }
}

const ComponentFactory = (data: ComponentTreeNode) => {
  const { name, key, ref } = data;

}

export interface ComponentTreeNode {
  title: string
  name: string
  key: string
  ref?: string
  children?: Array<ComponentTreeNode>
}
interface ComponentTreeProps {
  data: any
}
const data: Array<ComponentTreeNode> = [{
  title: "页面容器",
  name: "index",
  key: '0',
  children: [{
    title: "输入框",
    name: "Input",
    key: "0-0",
    ref: "antd"

  }]
}]

export default () => {
  return data
}
