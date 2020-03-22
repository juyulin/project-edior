import React, { useMemo, useEffect, Context } from 'react'
import Subscription from '../utils/subscription'
import { Store } from 'redux'
import ReactReduxContext from './context';


interface Props {
  store: Store
  children: any
  context: Context<any>
}


function Provider({
  store,
  context,
  children
} : Props) {
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription
    }
  }, [store])
  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])
  const Context = context || ReactReduxContext
  return <Context.Provider value={contextValue}>{children}</Context.Provider>


}