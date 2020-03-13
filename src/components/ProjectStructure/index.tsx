import React from 'react';
import { ProjectNode } from '../../types/project'
import PageStructure from './pageStructure'
import PageSelect from './pageSelect'
interface ProjectStructure {
  data: ProjectNode
}
export default (props: ProjectStructure) => {
  const { data } = props;
  const { pages } = data;
  return(
    <div>
      <PageSelect
        data={pages.map(({path, desc}) => ({
          key: path,
          desc
        }))} 
      /> 
      <PageStructure />

    </div>
  )
}