import { createStore, combineReducers, applyMiddleware } from 'redux'

import reducers from "../reducers"

const middleware = [

]

export default store = createStore(
    combineReducers(reducers),
    applyMiddleware(...middleware)
)