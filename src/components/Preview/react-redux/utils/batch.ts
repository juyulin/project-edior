function defaultNoopBatch(callback: Function) {
  callback()
}
type defaultNoopBatch = (cb: Function) => void

let batch = defaultNoopBatch

// Allow injecting another batching function later
export const setBatch = (newBatch: defaultNoopBatch) => (batch = newBatch)

// Supply a getter just to skip dealing with ESM bindings
export const getBatch = () => batch