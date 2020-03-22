
import { useContext } from 'react'
import { ReactReduxContext } from '../components/Context'


export function useReduxContext() {
  const contextValue = useContext(ReactReduxContext)

  if (process.env.NODE_ENV !== 'production' && !contextValue) {
    throw new Error(
      'could not find react-redux context value; please ensure the component is wrapped in a <Provider>'
    )
  }

  return contextValue
}


export default {}