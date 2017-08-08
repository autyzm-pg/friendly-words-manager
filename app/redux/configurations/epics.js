import actionTypes from "./actionTypes"
import 'rxjs'
import * as R from "ramda"
import {saveConfigFinish} from "./actions"
import {Toast} from "native-base"

export const saveConfigEpic = action$ =>
    action$.ofType(actionTypes.saveConfig)
        .map(({payload}) => saveConfigFinish(payload.name, payload.config))
        .do(() => Toast.show({
            text: "Zapisano!",
            position: "bottom",
            buttonText: "OK",
            type: "success",
            duration: 2000
        }))