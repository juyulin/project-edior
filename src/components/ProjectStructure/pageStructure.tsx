import React from 'react';
import { Tabs } from 'antd';
import { RouterNode } from '../../types/project'

const { TabPane } = Tabs;


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