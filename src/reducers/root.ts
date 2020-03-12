import { combineReducers } from 'redux'
import componentTypes from './componentTypes/reducer';
import project from './project/reducer'
import { ComponentTypeState } from './componentTypes/type';
import { ProjectState } from './project/type';
import projectEditor, { projectEditorState } from './projectEditor/reducer'


export interface State {
  componentTypes: ComponentTypeState;
  project: ProjectState;
  projectEditor: projectEditorState
}

export default combineReducers({
  componentTypes,
  project,
  projectEditor
})

