import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { State } from '../../../reducers/root'


export function useComponentsTree() {
  const componentTypes = useSelector((state: State) => state.componentTypes)
  const dispatch = useDispatch();
  React.useEffect(()=> {
    dispatch({
      type: 'GET_COMPONENT_TYPES'
    })
  }, [])
  return [componentTypes]
}

