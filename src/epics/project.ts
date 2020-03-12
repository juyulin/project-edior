import { ActionsObservable, Epic } from 'redux-observable';
import { FETCH_DATA_START } from '../constants/actionTypes/Project'
import { fetchDataSuccess } from '../actions/project'
import { Action, LifeStore } from '../types';
import { ajaxJson} from '../utils/ajax'
import 'rxjs/Rx';





const getProjectEpic = (action$: ActionsObservable<Action>) => {
  return action$.ofType(FETCH_DATA_START)
    .switchMap(() =>
      ajaxJson('GET','projects/templates/1')
    )
    .map(data => fetchDataSuccess(data))
}

export default getProjectEpic
