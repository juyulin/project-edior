import { useReducer, useRef, useMemo, useContext, useDebugValue } from 'react'
import { useReduxContext as useDefaultReduxContext } from './useReduxContext'
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect'
import Subscription from '../utils/Subscription'
import { ReactReduxContext } from '../components/Context'


type EqualityFn = (a: any, b: any) => boolean

const refEquality: EqualityFn = (a, b) => a === b

function useSelectorWithStoreAndSubscription(
  selector: Function,
  equalityFn: EqualityFn,
  store: any,
  contextSub: any
) : void

function useSelectorWithStoreAndSubscription(
  selector,
  equalityFn,
  store,
  contextSub
) {
  const [, forceRender] = useReducer(s => s + 1, 0)
  const subscription = useMemo(() => new Subscription(store, contextSub), [
    store,
    contextSub
  ])
  const latestSubscriptionCallbackError = useRef()
  const latestSelector = useRef()
  const latestSelectedState = useRef()

  let selectedState
  try {
    if (
      selector !== latestSelector.current ||
      latestSubscriptionCallbackError.current
    ) {
      selectedState = selector(store.getState())
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
   

    throw err
  }
  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
    latestSelectedState.current = selectedState
    latestSubscriptionCallbackError.current = undefined
  })

  useIsomorphicLayoutEffect(() => {
    function checkForUpdates() {
      try {
        const newSelectedState = latestSelector.current(store.getState())

        if (equalityFn(newSelectedState, latestSelectedState.current)) {
          return
        }

        latestSelectedState.current = newSelectedState
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err
      }

      forceRender({})
    }

    subscription.onStateChange = checkForUpdates
    subscription.trySubscribe()

    checkForUpdates()

    return () => subscription.tryUnsubscribe()
  }, [store, subscription])

  return selectedState

}

export function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)
      return function useSelector(selector: Function, equalityFn = refEquality) {
        if (process.env.NODE_ENV !== 'production' && !selector) {
          throw new Error(`You must pass a selector to useSelectors`)
        }
        const { store, subscription: contextSub } = useReduxContext()
    
        const selectedState = useSelectorWithStoreAndSubscription(
          selector,
          equalityFn,
          store,
          contextSub
        )
    
        useDebugValue(selectedState)
    
        return selectedState
      }

}