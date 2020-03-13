import { combineReducers } from 'redux'
import { stat } from 'fs';


export interface State {

}

const initState = {}

export default combineReducers({
  aa: (state = initState) =>  state
})

