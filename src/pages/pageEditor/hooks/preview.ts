import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { State } from '../../../reducers/root'
import { updateSelectedComponent } from '../../../actions/projectEditor'

export function useSelectedComponent():[string| undefined, (data: string | undefined) => void] {
  const projectEditor = useSelector((state: State) => state.projectEditor)
  const dispatch = useDispatch();
  const update =  (params: string | undefined): void => {
    const action = updateSelectedComponent(params)
    dispatch(action)
  }
  return [projectEditor.selectedComponent, update]
}


export function useMove() {
}