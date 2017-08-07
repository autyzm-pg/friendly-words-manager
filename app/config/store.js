import { createStore, combineReducers } from 'redux'

import {reducers} from "../redux"
import devToolsEnhancer from 'remote-redux-devtools';

const allReducers = {
    ...reducers,
}

export default store = createStore(
    combineReducers(allReducers),
    devToolsEnhancer()
)