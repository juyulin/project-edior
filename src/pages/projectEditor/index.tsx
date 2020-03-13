import React from 'react';
import { Layout, Drawer, Select, Button } from 'antd';
import ProjectStructure from './components/ProjectStructure'
import { ProjectNode } from '../../types/project'

const data: ProjectNode = {
  type: "ProjectNode",
  pages: [{
    type: "PageNode",
    path: "index",
    desc: "首页",
    components: [],
    index: {
      type: "ComponentNode",
      dependencies: [],
      mounted: [],
      stateCreator: [],
      body: [{
        type: "ComponentElement",
        name: "div"
      }]
    }
  }]
}
export default () => {
  return (
    <Layout>
    <Layout.Sider width={300} style={{ background: '#fff', padding: "20px" }} >
      <ProjectStructure
          data={data}
        />
    </Layout.Sider>
    <Layout.Content>
     
    </Layout.Content>
    <Layout.Sider width={400} style={{ background: '#fff', padding: '20px' }}>
    </Layout.Sider>
  </Layout>
  )
}