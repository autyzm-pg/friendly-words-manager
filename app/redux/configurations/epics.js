import Rx from "rxjs/Rx"
import 'rxjs'
import {saveConfigFinish} from "./actions"
import {Toast} from "native-base"
import * as configActionTypes from "./actionTypes"
import {addConfigDatabase} from "../../db"

export const saveConfigEpic = action$ =>
    action$.ofType(configActionTypes.saveConfig)
        .do(({payload}) => addConfigDatabase(payload))
        .map(({payload}) => saveConfigFinish(payload.name, payload.config))
        .do(() => Toast.show({
            text: "Zapisano!",
            position: "bottom",
            buttonText: "OK",
            type: "success",
            duration: 2000
        }))

export default [saveConfigEpic]