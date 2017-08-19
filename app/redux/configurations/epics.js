import Rx from "rxjs/Rx"
import 'rxjs'
import {
    changeActiveConfigFinished, deleteConfig, editConfig, loadActiveConfig, loadConfigs, loadConfigsFinish, saveConfig,
    saveConfigFinish
} from "./actions"
import * as configActionTypes from "./actionTypes"
import {addConfig, changeActiveConfig, readActiveConfig, readConfigs} from "../../db"
import * as R from "ramda"
import * as db from "../../db"
import ToastExt from "../../libs/ToastExt"

export const saveConfigEpic = action$ =>
    action$.ofType(configActionTypes.saveConfig)
        .flatMap(({payload}) => Rx.Observable.fromPromise(
            addConfig(payload).then(R.always(payload))
        ))
        .do(() => ToastExt.success("Zapisano!"))
        .flatMap(({name, config}) => Rx.Observable.of(
            saveConfigFinish(name, config),
            loadConfigs()
        ))

export const deleteConfigEpic = action$ =>
    action$.ofType(configActionTypes.deleteConfig.started)
        .flatMap(({payload}) => Rx.Observable.fromPromise(
            db.deleteConfig(payload).then(R.always(payload))
        ))
        .do(name => ToastExt.success(`Usunięto ${name}`))
        .flatMap(name => Rx.Observable.of(
            deleteConfig.finish(name),
            loadConfigs()
        ))

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

export const editConfigEpic = action$ =>
    action$.ofType(configActionTypes.editConfig.started)
        .map(R.prop('payload'))
        .flatMap(({previousName, name, config}) => Rx.Observable.concat(
            Rx.Observable.of(deleteConfig.start(previousName)),
            action$.ofType(configActionTypes.deleteConfig.finished).take(1)
                .flatMap(() => Rx.Observable.concat(
                    Rx.Observable.of(saveConfig(name, config)),
                    action$.ofType(configActionTypes.saveConfigFulfilled).take(1).mapTo(editConfig.finish({name, config}))
                ))
        ))

export const loadActiveConfigEpic = action$ =>
    action$.ofType(configActionTypes.loadActiveConfig.started)
        .do(() => console.log("Loading active config..."))
        .flatMap(() => Rx.Observable.fromPromise(readActiveConfig()))
        .do(data => console.log("Loaded active config: ", data))
        .map(loadActiveConfig.finish)

export default [saveConfigEpic, loadConfigsEpic, loadActiveConfigEpic, activeConfigChangeEpic, deleteConfigEpic, editConfigEpic]