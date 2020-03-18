import React from 'react';
import { Tabs } from 'antd';
import { RouterNode, Library } from '../../types/project'
import LibTreeSelect from './libTreeSelect'
import ComponentTree from './componentTree'
const { TabPane } = Tabs;


const libraries:Array<Library> = [{
  name: "antd",
  outputs: [{
    path: "index",
    outputs: [{
      name: "Input"
    }]
  }]
}]

export interface PageStructureProps {
  // data: RouterNode
}

export default (props: PageStructureProps) => {
  // const { index } = props.data;
  // const { dependencies, body } = index;
  return(
    <Tabs>
      <TabPane tab="Tab 1" key="1">
        <ComponentTree />
      </TabPane>
      <TabPane tab="Tab 1" key="2">
        <LibTreeSelect
          data={libraries}
        />
      </TabPane>
    </Tabs>
  )
}