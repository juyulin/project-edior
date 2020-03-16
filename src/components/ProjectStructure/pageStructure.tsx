import React from 'react';
import { Tabs } from 'antd';
import { RouterNode, Library } from '../../types/project'

const { TabPane } = Tabs;


const libraies:Array<Library> = [{
  name: "antd",
  exports: [{
    path: "index",
    exports: [{
      type: "Component",
      name: "Input"
    }]
  }]
}]

export interface PageStructureProps {
  data: RouterNode
}

export default (props: PageStructureProps) => {
  const { index } = props.data;
  const { dependencies, body } = index;
  return(
    <Tabs>
      <TabPane tab="Tab 1" key="1">
        Content of tab 1
      </TabPane>
      <TabPane tab="Tab 1" key="2">
        Content of tab 1
      </TabPane>
    </Tabs>
  )
}