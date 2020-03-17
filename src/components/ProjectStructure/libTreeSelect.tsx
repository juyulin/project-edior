import React from 'react';
import { Library } from '../../types/project'
import { Tree } from 'antd';


export interface LibTreeSelect {
  data: Array<any>
}

function transform(data: Array<Library>) {
  return data.map((item, index) => {
    const { desc, name, outputs } = item;
    return {
      title: <div>{desc || name}</div>,
      key: [name, index].join('_'),
      children: outputs.map((output, index) => {
        return {
          title: "path",
          key: [output.path, 1 ,index].join('_'),
          children: output.outputs.map((item, index) => {
            return {
              title: <div>{item.desc || item.name}</div>,
              key: [output.path, 1 , 1, index].join('_')
            }
          })
        }
        
      })
    }

  })
}
export default (props: LibTreeSelect) => {
  const { data } = props;
  const treeData = transform(data)
  return (
    <Tree treeData={treeData}></Tree>
  )
}