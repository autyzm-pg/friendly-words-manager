import { createStore, combineReducers, applyMiddleware } from 'redux'

import reducers from "../reducers"
import {wizardReducer} from "../libs/confy/reducers/wizardReducer"
import {configurationModel} from "./model"

const allReducers = {
    ...reducers,
    wizard: wizardReducer(configurationModel)
}

const middleware = [

];

export default store = createStore(
    combineReducers(allReducers),
    applyMiddleware(...middleware)
)