
import { useContext } from 'react'
import { ReactReduxContext } from '../components/Context'
import { useReduxContext as useDefaultReduxContext } from './useReduxContext'


export function useReduxContext() {
  const contextValue = useContext(ReactReduxContext)

  if (process.env.NODE_ENV !== 'production' && !contextValue) {
    throw new Error(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>'
    )
  }

  return contextValue
}

export function createStoreHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)
  return function useStore() {
    const { store } = useReduxContext() as any
    return store
  }
}



export const useStore = /*#__PURE__*/ createStoreHook()
