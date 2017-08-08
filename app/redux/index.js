import configurationsReducer from "./configurations/reducers"
import {saveConfigEpic} from "./configurations/epics"
import { combineEpics } from 'redux-observable'

export const reducers = {
    configurations: configurationsReducer
}

export const rootEpic = saveConfigEpic