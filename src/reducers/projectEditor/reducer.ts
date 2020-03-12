
import {
  UPDATE_SELECTED_COMPONENT,
  UPDATE_SELECTED_PAGE_PATH,
  UPDATE_PROJECT
} from '../../constants/actionTypes/projectEditor';


import { Project } from '../../types/project'
export interface projectEditorState {
  selectedComponent: undefined | string
  project: Project | undefined,
  selectedPath: string | undefined
}
export const initialState: projectEditorState = {
  selectedComponent: undefined,
  project: undefined,
  selectedPath: 'home',

};

interface Action {
  type: string;
  payload: any;
}
export default function (state = initialState, action: Action) {
  switch (action.type) {
      case UPDATE_SELECTED_COMPONENT:
        return {
          ...state,
          selectedComponent: action.payload
        }
      case UPDATE_PROJECT:
          return {
            ...state,
            project: action.payload
          }
      case UPDATE_SELECTED_PAGE_PATH:
          return {
            ...state,
            selectedPath: action.payload
          }
      default:
          return state;
  }
}