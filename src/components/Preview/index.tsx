import React from 'react'

import { Store, StoreProvider } from "./redux";
import App from './app'

export default () => (
  <StoreProvider>
    <App />
  </StoreProvider>
)
