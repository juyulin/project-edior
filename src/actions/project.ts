import { 
  FETCH_DATA_START, 
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE, 
} from '../constants/actionTypes/Project'

export const fetchData = (params: any) => ({
  type: FETCH_DATA_START,
  payload: params
});

export const fetchDataSuccess = (data: Array<any>) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data
});

export const fetchWhiskiesFailure = (message: string) => ({
  type: FETCH_DATA_FAILURE,
  payload: message
});


