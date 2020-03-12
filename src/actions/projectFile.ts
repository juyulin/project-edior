import { 
  CREATE_PROJECT_FILE,
  UPDATE_PROJECT_FILE_SUCCESS
} from '../constants/actionTypes/projectFile'

export const createProjectFile = (data: any) => ({
  type: CREATE_PROJECT_FILE,
  payload: data
})

export const updateProjectFileSuccess = () => ({
  type: UPDATE_PROJECT_FILE_SUCCESS
})