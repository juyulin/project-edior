
import {
  CREATE_PROJECT_FILE
} from '../../constants/actionTypes/projectFile';

const initialState = {
  data: {
    pages: []
  },
  loading: false,
  error: false
};

interface Action {
  type: string;
  payload: any;
}
export default function (state = initialState, action: Action) {
  switch (action.type) {
      case CREATE_PROJECT_FILE:
        return {
          ...state,
          data: action.payload
        }
      default:
          return state;
  }
}