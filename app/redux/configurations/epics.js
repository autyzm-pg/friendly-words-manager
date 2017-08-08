
import actionTypes from "./actionTypes"
import 'rxjs';
import * as R from "ramda"
import {saveConfigFinish} from "./actions"

export const saveConfigEpic = action$ =>
    action$.ofType(actionTypes.saveConfig)
        .map(R.tap((...args) => console.log(args)))
        .map(({payload}) => saveConfigFinish(payload.name, payload.config))