import React from 'react';
import { Layout, Drawer, Select, Button } from 'antd';
import  * as Icon from '@ant-design/icons';


import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../reducers/root'
import { fetchData } from '../../actions/project';
import { Page } from '../../types/project';
import ProjectContent from './components/ProjectContent'
import ComponentEditor from '../../components/ComponentEditor'
import { getDefaultExportReturnNode } from './astUtil'
import Preview from '../../components/Preview'
import { JSXEditableNode } from '../../types'
import { JSXElement } from '@babel/types';
import { useSelectedComponent } from './hooks/preview'
import { useProject, useSelectedPagePath, useUpdateProject } from './hooks/pageEditor'

const { Sider, Content } = Layout;
const { Option } = Select;



interface ModalAction {
  key: string | null | undefined;
  payload: any;
}


function useModal<P>(payload: P | undefined, visible = false){
  const [state, setState] = React.useState({
    visible,
    payload: payload
  })
  const toggle = (payload?: P) => {
    const { visible } = state
    setState({
      visible: !visible,
      payload: payload
    })
  }
  return {
    state,
    toggle
  }
}

function init() {

}
export default function () {
  // const [modal, setModal] = React.useState<ModalAction>({
  //   key: null,
  //   payload: null
  // })
  const dispatch = useDispatch();
  const project  =  useUpdateProject()
  
  const [editedNode, setEditedNode] = React.useState<null | JSXEditableNode>(null);
  const [pagePath, setPagePath] = useSelectedPagePath()
  const selectPage = _.find(project? project.pages : [], {
    path: pagePath
  }) 
  React.useEffect(() => {
    dispatch(fetchData({}))
  }, [])
  const [selectedComponent, setSelectedComponent] = useSelectedComponent()
  return <Layout>

    <Sider width={200} style={{ background: '#fff' }} >
     
      {
        project && <ProjectContent
          pagePath={pagePath}
          onPagePathChange={setPagePath}
          data={project}
          onEdit={(data: any) => {
            setEditedNode(data)
          }}
        />
      }
    </Sider>
    <Content>
      <iframe src="http://localhost:3001/#/home"/>
      <div>
        {selectPage && <Preview data={getDefaultExportReturnNode(selectPage.file)} />}
      </div>
    </Content>
    <Sider width={400} style={{ background: '#fff', padding: '20px' }}>
      {/* <ComponentEditor
        onStyleChange={onStyleChange}
        onChange={onChange}
        node={editedNode}
      /> */}
    </Sider>
  </Layout>
}
