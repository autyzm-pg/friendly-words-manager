import Rx from "rxjs/Rx"
import 'rxjs'
import {changeActiveConfigFinished, loadActiveConfig, loadConfigs, loadConfigsFinish, saveConfigFinish} from "./actions"
import {Toast} from "native-base"
import * as configActionTypes from "./actionTypes"
import {addConfig, changeActiveConfig, readActiveConfig, readConfigs} from "../../db"
import * as R from "ramda"

export const saveConfigEpic = action$ =>
    action$.ofType(configActionTypes.saveConfig)
        .flatMap(({payload}) => Rx.Observable.fromPromise(
            addConfig(payload).then(R.always(payload))
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
        .flatMap(() => Rx.Observable.fromPromise(readConfigs()))
        .do(data => console.log("Loaded configs: ", data))
        .map(loadConfigsFinish)

export const activeConfigChangeEpic = action$ =>
    action$.ofType(configActionTypes.changedActiveConfig)
        .flatMap(({payload}) => Rx.Observable.fromPromise(changeActiveConfig(payload).then(R.always(payload))))
        .flatMap((activeConfig) => Rx.Observable.of(
            changeActiveConfigFinished(activeConfig),
            loadActiveConfig.start()
        ))

export const loadActiveConfigEpic = action$ =>
    action$.ofType(configActionTypes.loadActiveConfig.started)
        .do(() => console.log("Loading active config..."))
        .flatMap(() => Rx.Observable.fromPromise(readActiveConfig()))
        .do(data => console.log("Loaded active config: ", data))
        .map(loadActiveConfig.finish)

export default [saveConfigEpic, loadConfigsEpic, loadActiveConfigEpic, activeConfigChangeEpic]