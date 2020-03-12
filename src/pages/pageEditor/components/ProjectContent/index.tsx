import React from 'react';
import { Drawer, Button, Form } from 'antd';
import { useDispatch, useSelector  } from 'react-redux';
import * as _ from 'lodash';
import { DrawerProps } from 'antd/lib/drawer'
import traverse from '@babel/traverse';
import t from '@babel/types';

import { File, JSXElement, cloneNode, JSXText } from '@babel/types'
import ComponentsTree from '../../../../components/ComponentsTree';
import { State } from '../../../../reducers/root'
import PageSelect from '../PageSelect'
import { Page, Project } from '../../../../types/project'
import  { Values as PageSelectValue} from '../PageSelect'
import { useToggle } from '../../hooks/toggle';
import ComponentTypes from '../ComponentTypes'

import { 
  getDefaultExportReturnNode, 
  getNode,
  insertComponentNode
} from '../../astUtil'

interface ProjectContentProps {
  data: Project
  onPagePathChange: (path: undefined | string) => void
  pagePath: undefined | string
  onAddModal?: Function
  onEdit?: Function,
  // onComponentsTreeChange: Function

}





export default function ProjectContent(props: ProjectContentProps) {
  const { data, pagePath } = props;
  const [pageSelectForm] = Form.useForm()
  const [insertModalVisible, toggleInsertModalVisible] = useToggle();
  const [insertComponent, setInsertComponent]  = React.useState()
  const curPage = _.find(data.pages, {path: pagePath})
  return (
    <>
       <PageSelect 
          form={pageSelectForm}
          data={data.pages }
        />
        <ComponentsTree
          data={curPage && getDefaultExportReturnNode(curPage.file)}
        />
        <Drawer
          title="添加组件"
          placement="right"
          width={600}
          mask={false}
          visible={insertModalVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                // onClick={(e) => close()}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button disabled={!insertComponent} onClick={() => {}} type="primary">
                Submit
              </Button>
            </div>
            }
        >
          <ComponentTypes
            onChange={setInsertComponent}
            value={insertComponent}
          />
        </Drawer>
    </>
  )
}

// interface InsertComponentProps extends DrawerProps{
//   onOk: Function
//   close: Function
// }



// export default class ProjectContent extends React.PureComponent<ProjectContentProps, ProjectContentState> {
//   state = {
//     pagePath: 'home',
//     curPage: undefined,
//     pageComponents: undefined,
//     action: {
//       type: undefined,
//       payload: ''
//     },
//     componentsTree: null
//   }
//   onPagePathChange = (value: PageSelectValue) => {
//     this.setState({
//       pagePath: value.path,
//       curPage: value.path ? _.find(this.props.data.pages, {path: value.path}) : undefined
//     })
//   }
//   componentDidUpdate() {
//     const { data } = this.props;
//     if(!data || data.pages.length === 0) return null
//     this.setComponentsTree()
//   }

//   setComponentsTree = () => {
//     const { data } = this.props; 
//     const { pagePath } = this.state;
//     const { pages } = data;
//     const componentsTree = this.getCompoentsTree(pages, pagePath)
//     this.setState({
//       componentsTree
//     })
//   }

//   getPageComponents = (page: Page) => getDefaultExportReturnNode(page.file)


//   getCompoentsTree = (pages: Array<Page>, path: string): JSXElement => {
//     const page = _.find(pages, {path})
//     if(!page) {
//       throw new Error('未找到对应页面')
//     }
//     return this.getPageComponents(page)
//   }
  
//   getCurComponentsTree = (): JSXElement => {
//     const { data } = this.props;
//     const { pages } = data;
//     const { pagePath } = this.state;
//     return this.getCompoentsTree(pages, pagePath)
//   }

//   onClose = () => {
//     this.setState({
//       action: {
//         type: undefined,
//         payload: undefined
//       }
//     })
//   }

//   onInsertComponent = (data: any) => {
  
//     const { action, pagePath } = this.state;
//     const payload = action.payload
//     const node  = getNode([this.getCurComponentsTree()], payload.split('_')) as JSXElement
//     const page = _.find(this.props.data.pages, {path: pagePath}) as Page
//     insertComponentNode(page.file, node)
//     this.forceUpdate()
//   }



//   render() {
//     const { data } = this.props;
//     if(!data || data.pages.length === 0) return null
//     const { pages } = data;
//     const { pagePath, action } = this.state;
//     return (
//       <>
//         <PageSelect 
//           initValues={{
//             path: pagePath
//           }}
//           onChange={this.onPagePathChange}
//           data={pages}
//         />
//         <ComponentsTree
//           data={this.getCompoentsTree(pages, pagePath)} 
//           onClickInsert={(key: string) => {
//             this.setState({
//               action: {
//                 type: 'INSERT',
//                 payload: key
//               }
//             })
//           }}
//         />
//         <AddComponentDraw
//           onOk={(data: any) => this.onInsertComponent(data)}
//           close={this.onClose}
//           key="modal"
//           visible={action.type === 'INSERT'}
//         />

//       </>
//     )

//   }
// }
//  const a = (props: ProjectContent) => {
//   // const { onAddModal, onEdit } = props
//   // const [data, setData] = React.useState(props.data)
//   // const [addComponentDraw , setAddComponentDraw] = React.useState(false)
//   // const [insertNode, setInsertNode] = React.useState<null | JSXElement>(null)
//   // React.useEffect(() => {
//   //   props.data!== data && setData(data)
//   // }, [props.data])
//   // const indexFile = data.file;
//   // const defaultJSXElement = getDefaultExportReturnNode(indexFile)
//   // const { pages } = props.data;
//   // const [curPagePath, setCurPagePath] = React.useState(null)

//   return <>
//     {/* { <PageSelect
//       value={curPagePath}
//       data={pages}
//       onChange={setCurPagePath}
//     />}  */}
//     {/* <ComponentsTree
//       key="tree"
//       data={defaultJSXElement}
//       onEdit={onEdit}
//       onAddModal={(node: JSXElement) => {
//         const newFile: File = addComponentNode(data.file, node, node);
//         setData({
//           ...data,
//           file: newFile
//         })
//       }}

//     />
//     <AddComponentDraw 
//       key="modal"
//       visible={addComponentDraw}
//       onClose={() => {setAddComponentDraw(false)}}
//     /> */}
//   </>
// }

