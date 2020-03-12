import { 
  UPDATE_SELECTED_COMPONENT,
  UPDATE_PROJECT,
  UPDATE_SELECTED_PAGE_PATH
} from '../constants/actionTypes/projectEditor'

export const updateSelectedComponent = (params: any) => ({
  type: UPDATE_SELECTED_COMPONENT,
  payload: params
});


export const updateSelectedPagePath = (path: string | undefined) => ({
  type: UPDATE_SELECTED_PAGE_PATH,
  payload: path
})

export const updateProject = (data: any) => ({
  type: UPDATE_PROJECT,
  payload: data
})