import React from 'react';
import ComponentTypes, { ComponentTypesProps } from '../../../../components/ComponentTypes'
import { useComponentsTree } from '../../hooks/componentsTree';



export default (props: ComponentTypesProps) => {
  const [componentTypes] = useComponentsTree()
  return (
    <ComponentTypes 
      data={componentTypes.data}
      {...props}
    />
  )
}