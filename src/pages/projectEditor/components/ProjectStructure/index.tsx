import React from 'react';
import { ProjectNode } from '../../../../types/project'
import ProjectStructure from '../../../../components/ProjectStructure'
interface ProjectStructureProps {
  data: ProjectNode
}
export default (props: ProjectStructureProps) => {
  const { data } = props

  return (
    <div>
      <ProjectStructure
        data={data}
      />
    </div>
  )
}