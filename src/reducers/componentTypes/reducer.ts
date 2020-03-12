
import {
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE
} from '../../constants/actionTypes/componentTypes';

const initialState = {
  data: [],
  loading: false,
  error: false
};

interface Action {
  type: string;
  payload: any;
}
export default function (state = initialState, action: Action) {
  switch (action.type) {
      case FETCH_DATA_SUCCESS:
        return {
          ...state,
          data: action.payload
        }
      case FETCH_DATA_FAILURE: 
        return {
          ...state,
          data: [],
          error: action.payload
        }
      default:
          return state;
  }
}