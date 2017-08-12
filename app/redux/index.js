import configurationsReducer from "./configurations/reducers"
import { combineEpics } from 'redux-observable'
import configEpics from "./configurations/epics"
import appEpics from "./app/epics"
import appReducer from "./app/reducers"

export const reducers = {
    configurations: configurationsReducer,
    app: appReducer
}

export const rootEpic = combineEpics(
    ...appEpics,
    ...configEpics,
)