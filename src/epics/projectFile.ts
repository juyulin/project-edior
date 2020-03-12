import { ActionsObservable } from 'redux-observable';
import { CREATE_PROJECT_FILE } from '../constants/actionTypes/projectFile'
import { updateProjectFileSuccess } from '../actions/projectFile'
import { Action, LifeStore } from '../types';
import { ajaxJson} from '../utils/ajax'
import 'rxjs/Rx';





export const createProjectFileEpic = (action$: ActionsObservable<Action>) => {
  return action$.ofType(CREATE_PROJECT_FILE)
    .switchMap((data) => {
      return ajaxJson('post','projects/files/2', data.payload)
      }
    )
    .map(() => updateProjectFileSuccess())
}




