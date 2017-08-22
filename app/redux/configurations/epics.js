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

const isActiveConfig = name => R.compose(
    R.equals(name),
    R.path(['active', 'name'])
)

const takeFirstNotDeleted = nameOfDeleted => R.compose(
    R.prop('name'),
    R.prop(0),
    R.takeLast(1),
    R.filter(R.o(R.not, R.propEq('name', nameOfDeleted))),
)

export const deleteConfigEpic = (action$, store) =>
    action$.ofType(configActionTypes.deleteConfig.started)
        .flatMap(({payload: name}) => Rx.Observable.fromPromise(
            db.deleteConfig(name)
                .then(() => store.getState())
                .then(R.prop('configurations'))
                .then(R.when(
                    isActiveConfig(name),
                    ({all, active}) => db.changeActiveConfig(
                        takeFirstNotDeleted(name)(all),
                        active.mode
                    )
                ))
                .then(R.always(name)),
        ))
        .do(name => ToastExt.success(`Usunięto ${name}`))
        .flatMap(name => Rx.Observable.of(
            deleteConfig.finish(name),
            loadConfigs(),
            loadActiveConfig.start(),
        ))

export const loadConfigsEpic = action$ =>
    action$.ofType(configActionTypes.loadingConfigs)
        .do(() => console.log("Loading configs..."))
        .flatMap(() => Rx.Observable.fromPromise(readConfigs()))
        .do(data => console.log("Loaded configs: ", data))
        .map(loadConfigsFinish)

export const activeConfigChangeEpic = action$ =>
    action$.ofType(configActionTypes.changedActiveConfig)
        .flatMap(({payload}) => Rx.Observable.fromPromise(changeActiveConfig(payload.name, payload.mode).then(R.always(payload))))
        .flatMap((activeConfig) => Rx.Observable.of(
            changeActiveConfigFinished(activeConfig),
            loadActiveConfig.start()
        ))

export const editConfigEpic = action$ =>
    action$.ofType(configActionTypes.editConfig.started)
        .map(R.prop('payload'))
        .flatMap(({previousName, name, config}) => Rx.Observable.fromPromise(
            db.deleteConfig(previousName)
                .then(() => addConfig({name, config}))
                .then(R.always({previousName, name, config}))
        ))
        .do(() => ToastExt.success("Zapisano!"))
        .flatMap((payload) => Rx.Observable.of(
            editConfig.finish(payload),
            loadConfigs()
        ))

export const loadActiveConfigEpic = action$ =>
    action$.ofType(configActionTypes.loadActiveConfig.started)
        .do(() => console.log("Loading active config..."))
        .flatMap(() => Rx.Observable.fromPromise(readActiveConfig()))
        .do(data => console.log("Loaded active config: ", data))
        .map(loadActiveConfig.finish)

export default [saveConfigEpic, loadConfigsEpic, loadActiveConfigEpic, activeConfigChangeEpic, deleteConfigEpic, editConfigEpic]