import React from 'react';
import * as _ from 'lodash';
import * as Antd from 'antd'


interface Component {
  props: any;
  component: React.Component | React.FC
}
const NodeModules = {
  'antd': {
    Input: {
      component: Antd.Input,
      props: {
        "type": "object",
        "properties": {
          "value": {
            "type": "string"
          },
          "onChange": {
            "type": "function"
          }
        }
      }

    }
  }
}


function ComponentCreator(data: ComponentTreeNode) {
  const { children = [] } = data;
  return React.createElement('div', {}, children.map(ComponentFactory))
}
const ComponentFactory = (data: ComponentTreeNode) => {
  const { name, key, ref } = data;
  const path = (ref || "").split("/")
  return _.get(NodeModules, [...path, name])
}

export interface ComponentTreeNode {
  title: string
  name: string
  key: string
  ref?: string
  children?: Array<ComponentTreeNode> | ComponentTreeNode | SelfComponentTreeNode
}

interface SelfComponentTreeNode extends ComponentTreeNode {
  title: string
  name: string

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
  return React
}
