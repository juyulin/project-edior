import React from 'react';
import { Library } from '../../types/project'
import { Tree } from 'antd';


export interface LibTreeSelect {
  data: Array<any>
}

function transform(data: Array<Library>) {
  return data.map(item => {
    const { desc, name, outputs } = item;
    return {
      title: desc || name,
      children: outputs.map(output => {
        return {
          title: output.title || output.name
        }
      })
    }

  })
}
export default (props: LibTreeSelect) => {
  const { data } = props;
  
  return (
    <Tree></Tree>
  )
}