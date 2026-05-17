import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import * as reducers from '../reducers'
import * as React from 'react'

const reducer = combineReducers({
    ...reducers,
    form: formReducer,
})

function configureStoreProd(initialState) {
    return createStore(reducer, initialState, compose(applyMiddleware(thunk)))
}

function configureStoreDev(initialState) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
    const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))

    return store
}

export const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev
//export const store = configureStore({})

export default configureStore
