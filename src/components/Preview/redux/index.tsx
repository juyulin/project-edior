import React from 'react';
import { Action, Reducer } from './types'

interface State {
  "aa": Object
}
const initialState: State = {
  "aa": {}
}

export const Store = React.createContext(initialState);



function reducer(state: State, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, episodes: action.payload };
    default:
      return state;
  }
}
export function StoreProvider(props: any) {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}