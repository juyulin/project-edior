import { Store } from 'redux'
const nullListeners = { notify() {} }

export default class Subscription{
  store: Store;
  unsubscribe: null
  constructor(store: Store) {
    this.store = store
    this.unsubscribe = null
    // this.listeners = nullListeners

  }
}