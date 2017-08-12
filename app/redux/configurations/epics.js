import 'rxjs'
import {loadConfigsFinish, saveConfigFinish} from "./actions"
import {Toast} from "native-base"
import * as configActionTypes from "./actionTypes"

export const saveConfigEpic = action$ =>
    action$.ofType(configActionTypes.saveConfig)
        .map(({payload}) => saveConfigFinish(payload.name, payload.config))
        .do(() => Toast.show({
            text: "Zapisano!",
            position: "bottom",
            buttonText: "OK",
            type: "success",
            duration: 2000
        }))

export const loadConfigsEpic = action$ =>
    action$.ofType(configActionTypes.loadingConfigs)
        .do(() => console.log("Loading configs"))
        .map(() => [{name: "someName", config: {}}])
        .map(loadConfigsFinish)

export default [loadConfigsEpic, saveConfigEpic]