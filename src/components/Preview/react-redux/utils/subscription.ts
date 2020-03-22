import { Store } from 'redux'
import { getBatch } from './batch';
export interface NullListeners {
  notify: () => void
}
const nullListeners = { notify() {} }
type listener = {
  callback: Function,
  next: listener | null,
  prev: listener | null
}
type listenerCollection = {
  clear: () => void,
  notify:  () => void,
  get: () => Array<listener>,
  subscribe: (callback: Function) => Unsubscribe,

}

export interface Unsubscribe {
  (): void
}

function createListenerCollection() : listenerCollection{
  const batch = getBatch()
  let first: listener | null = null
  let last: listener | null = null

  return {
    clear() {
      first = null
      last = null
    },

    notify() {
      batch(() => {
        let listener = first
        while (listener) {
          listener.callback()
          listener = listener.next
        }
      })
    },

    get() {
      let listeners = []
      let listener = first
      while (listener) {
        listeners.push(listener)
        listener = listener.next
      }
      return listeners
    },

    subscribe(callback: Function) {
      let isSubscribed = true
      let listener: listener = (last = {
        callback,
        next: null,
        prev: last
      })

      if (listener.prev) {
        listener.prev.next = listener
      } else {
        first = listener
      }

      return function unsubscribe() {
        if (!isSubscribed || first === null) return
        isSubscribed = false

        if (listener.next) {
          listener.next.prev = listener.prev
        } else {
          last = listener.prev
        }
        if (listener.prev) {
          listener.prev.next = listener.next
        } else {
          first = listener.next
        }
      }
    }
  }
}
export default class Subscription{
  store: Store;
  unsubscribe: null | Unsubscribe;
  listeners: NullListeners | listenerCollection;
  parentSub: Subscription | null | undefined
  onStateChange: null | Function
  constructor(store: Store, parentSub?: Subscription) {
    this.store = store
    this.unsubscribe = null
    this.parentSub = parentSub;
    this.listeners = nullListeners;
    this.onStateChange = null
  }

  notifyNestedSubs() {
    this.listeners.notify()
  }

  tryUnsubscribe = () => {
    if (this.unsubscribe) {
      const listeners = this.listeners as listenerCollection
      this.unsubscribe()
      this.unsubscribe = null
      listeners.clear()
      this.listeners = nullListeners
    }
  }
  trySubscribe = () => {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        ? this.parentSub.addNestedSub(this.handleChangeWrapper)
        : this.store.subscribe(this.handleChangeWrapper)

      this.listeners = createListenerCollection()
    }
  }
  handleChangeWrapper = () => {
    if (this.onStateChange) {
      this.onStateChange()
    }
  }

  addNestedSub = (listener: Function ) => {
    this.trySubscribe()
    const listeners = this.listeners as listenerCollection;

    return listeners.subscribe(listener)
  }
}