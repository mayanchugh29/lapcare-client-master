import {useMemo} from 'react'
import {createStore,applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers/rootReducer';
import authReducer from './reducers/auth';
import cartReducer from './reducers/cart';
import checkoutProductReducer from './reducers/checkout';
import orderDetailsReducer from './reducers/order';
import toastifyReducer from './reducers/toastify';
import userReducer from './reducers/user';

const initialState = {
  authReducer,
  cartReducer,
  checkoutProductReducer,
  orderDetailsReducer,
  toastifyReducer,
  userReducer
}

let store;

function initStore(preloadedState = initialState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}