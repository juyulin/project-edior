import React from 'react';
import { Tabs } from 'antd';
import { PageNode } from '../../types/project'

const { TabPane } = Tabs;


export interface PageStructureProps {
}

export default (props: PageStructureProps) => {
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