import React from 'react';
import { Tree } from 'antd';
import { TreeProps } from 'antd/lib/tree'
import { ComponentElement } from '../../types/project'

interface ComponentTreeNode {
  title: string
  name: string
  key: string
  ref?: string
  children?: Array<ComponentTreeNode>
}
interface ComponentTreeProps{
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


function transform(data: ComponentElement) {
  return [{
    title: "页面容器",
    children: data.children
  }]
}
export default () => {

  return (
    <Tree 
      treeData={data}
    />
  )
}