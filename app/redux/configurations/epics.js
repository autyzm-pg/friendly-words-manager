import Rx from "rxjs/Rx"
import 'rxjs'
import {loadConfigs, loadConfigsFinish, saveConfigFinish} from "./actions"
import {Toast} from "native-base"
import * as configActionTypes from "./actionTypes"
import {addConfigDatabase, readConfigsDatabase} from "../../db"
import * as R from "ramda"

export const saveConfigEpic = action$ =>
    action$.ofType(configActionTypes.saveConfig)
        .flatMap(({payload}) => Rx.Observable.fromPromise(
            addConfigDatabase(payload).then(R.always(payload))
        ))
        .flatMap(({name, config}) => Rx.Observable.of(
            saveConfigFinish(name, config),
            loadConfigs()
        ))
        .do(() => Toast.show({
            text: "Zapisano!",
            position: "bottom",
            buttonText: "OK",
            type: "success",
            duration: 2000
        }))

export const loadConfigsEpic = action$ =>
    action$.ofType(configActionTypes.loadingConfigs)
        .do(() => console.log("Loading configs..."))
        .flatMap(() => Rx.Observable.fromPromise(readConfigsDatabase()))
        .map(loadConfigsFinish)
        .do(data => console.log("Loaded configs: ", data))

export default [saveConfigEpic, loadConfigsEpic]