import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import * as _ from 'lodash'
import { State } from '../../../reducers/root'
import { Project, Page } from '../../../types/project'
import { updateSelectedPagePath, updateProject } from '../../../actions/projectEditor'
import { exchangeNode } from '../astUtil'



export function useSelectedPagePath(): [string | undefined, (data: string | undefined) => void] {
  const selectedPath = useSelector((state: State) => state.projectEditor.selectedPath)
  const dispatch = useDispatch();
  const update = (path: string | undefined) => {
    const action = updateSelectedPagePath(path);
    dispatch(action)
  }
  return [selectedPath, update]
}

export function useUpdateProject() {
  const project =  useSelector((state: State) => state.project.data)
  const dispatch = useDispatch();
  const update = (data: any) => {
    const action = updateProject(data);
    dispatch(action)
  }
  React.useEffect(() => {
    update(project)
  }, [project])
  return  useSelector((state: State) => state.projectEditor.project)
}

export function useProject() {
  const project =  useSelector((state: State) => state.project)
  const dispatch = useDispatch();
  const update = (data: any) => {
    const action = updateProject(data);
    dispatch(action)
  }
  React.useEffect(() => {
    update(project)
  }, [project])
  return  useSelector((state: State) => state.projectEditor.project)
}



export function useSelectedPage():[Page, (data: Page) => void] {
  const dispatch = useDispatch();
  const project =  useSelector((state: State) => state.projectEditor.project)
  const selectedPath = useSelector((state: State) => state.projectEditor.selectedPath)
  const pages = project ? project.pages : []
  const page = _.find(pages, { path: selectedPath} ) as Page
  const update = (newPage: Page) => {
    const pages =  (project as Project).pages.map((item) => item.path === selectedPath ? newPage : item)
    const action = updateProject({
      ...project,
      pages
    })
    dispatch(action)
  }
  return [page, update]
}

export function useExchangeComponent() {
 const [page,updateProject] = useSelectedPage()
 return (id1: string, id2: string) => {
  const newPage ={
    ...page,
    file: exchangeNode(page.file, id1, id2)
  }
  updateProject(newPage)
 }
}

// export function useUpdatePage() {
//   const dispatch = useDispatch();
//   const update = (data: any) => {
//     const action = updateProject(data);
//     dispatch(action)
//   }

// }