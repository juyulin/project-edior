import { ActionsObservable, Epic } from 'redux-observable';
import { fetchDataSuccess } from '../actions/componentTypes'
import { Action, LifeStore } from '../types';
import { ajaxJson} from '../utils/ajax'
import 'rxjs/Rx';





const pingEpic = (action$: ActionsObservable<Action>) => {
  return action$.ofType('GET_COMPONENT_TYPES')
    .switchMap(() =>
      ajaxJson('GET','componentTypes')
    )
    .map(data => fetchDataSuccess(data))
}

export default pingEpic
