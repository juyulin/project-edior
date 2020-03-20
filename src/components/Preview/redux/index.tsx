import React from 'react';
const initialState = {
  "aa": {}
}

export const Store = React.createContext(initialState);


function reducer() {}

export function StoreProvider(props: any) {

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}