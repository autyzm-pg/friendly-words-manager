import configurationsReducer from "./configurations/reducers"
import {combineEpics} from 'redux-observable'
import configEpics from "./configurations/epics"
import appEpics from "./app/epics"
import appReducer from "./app/reducers"
import initializers from "./initializersRegister"
import * as R from "ramda"

export const reducers = {
    configurations: configurationsReducer,
    app: appReducer
}

const initializersEpic = combineEpics(
    ...initializers.map(R.prop('epic'))
)

export const rootEpic = combineEpics(
    ...appEpics,
    ...configEpics,
    initializersEpic,
)
