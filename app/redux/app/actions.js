import * as appActionTypes from "./actionTypes"
import {plainAction} from "../../libs/actions"

export const startApp = plainAction(appActionTypes.startedApp)
export const finishStartingApp = plainAction(appActionTypes.finishedStartingApp)

