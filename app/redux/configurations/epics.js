import Rx from "rxjs/Rx"
import 'rxjs'
import {
    changeActiveConfigFinished,
    editConfig,
    loadActiveConfig,
    loadConfigs,
    loadConfigsFinish,
    saveConfigFinish,
    deleteConfig as deleteConfigAction,
} from "./actions"
import * as configActionTypes from "./actionTypes"
import {addConfig, readActiveConfig, updateConfig} from "../../db/configs"
import * as R from "ramda"
import ToastExt from "../../libs/ToastExt"
import {changeActiveConfig, deleteConfig, readConfigs} from "../../db/configs"

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

const isActiveConfig = id => R.compose(
    R.equals(id),
    R.path(['active', 'id'])
)

const takeFirstNotDeleted = (idOfDeleted, all) => R.compose(
    R.prop('id'),
    R.prop(0),
    R.takeLast(1),
    R.filter(R.o(R.not, R.propEq('id', idOfDeleted))),
)(all)

export const deleteConfigEpic = (action$, store) =>
    action$.ofType(configActionTypes.deleteConfig.started)
        .map(R.prop('payload'))
        .flatMap(({id, name}) => Rx.Observable.fromPromise(
            deleteConfig(id)
                .then(() => store.getState())
                .then(R.prop('configurations'))
                .then(R.when(
                    isActiveConfig(id),
                    ({all, active}) => changeActiveConfig(
                        takeFirstNotDeleted(id, all),
                        active.mode
                    )
                ))
                .then(R.always(name)),
        ))
        .do(name => ToastExt.success(`Usunięto ${name}`))
        .flatMap(name => Rx.Observable.of(
            deleteConfigAction.finish(name),
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
        .flatMap(({payload}) => Rx.Observable.fromPromise(changeActiveConfig(payload.id, payload.mode).then(R.always(payload))))
        .flatMap((activeConfig) => Rx.Observable.of(
            changeActiveConfigFinished(activeConfig),
            loadActiveConfig.start()
        ))

export const editConfigEpic = action$ =>
    action$.ofType(configActionTypes.editConfig.started)
        .map(R.prop('payload'))
        .flatMap(({id, name, config}) => Rx.Observable.fromPromise(
            updateConfig(id, {name, config})
                .then(R.always({id, name, config}))
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