import Rx from "rxjs/Rx"
import 'rxjs'
import {
    resourcesActionTypes,
    loadResources,
    addResource, deleteResource, editResource
} from "./actions"
import * as R from "ramda"
import {combineEpics} from 'redux-observable'
import ToastExt from "../../libs/ToastExt"
import {addRecord, deleteRecord, readTable, updateRecord} from "../../db/db"

export const addResourceEpic = action$ =>
    action$.ofType(resourcesActionTypes.addResource.started)
        .flatMap(({payload}) => Rx.Observable.fromPromise(
            addRecord(payload.resourceName, payload.data).then(R.always(payload))
        ))
        .do(() => ToastExt.success("Zapisano!"))
        .flatMap(({resourceName, data}) => Rx.Observable.of(
            addResource.finish(resourceName, data),
            loadResources.start(resourceName)
        ))

export const deleteResourceEpic = action$ =>
    action$.ofType(resourcesActionTypes.deleteResource.started)
        .map(R.prop('payload'))
        .flatMap(({id, resourceName}) => Rx.Observable.fromPromise(
            deleteRecord(resourceName, id).then(R.always(resourceName))
        ))
        .do(() => ToastExt.success(`Usunięto zasób`))
        .flatMap(resourceName => Rx.Observable.of(
            deleteResource.finish(resourceName),
            loadResources.start(resourceName)
        ))

export const loadResourcesEpic = action$ =>
    action$.ofType(resourcesActionTypes.loadResources.started)
        .do(({payload}) => console.log(`Loading resources from '${payload.resourceName}'...`))
        .flatMap(({payload}) =>
            Rx.Observable.fromPromise(readTable(payload.resourceName))
                .do(data => console.log(`Loaded resource from '${payload.resourceName}': `, data))
                .map(data => loadResources.finish(payload.resourceName, data))
        )

export const editConfigEpic = action$ =>
    action$.ofType(resourcesActionTypes.editResource.started)
        .map(R.prop('payload'))
        .flatMap(({id, resourceName, data}) => Rx.Observable.fromPromise(
            updateRecord(resourceName, id, data)
                .then(R.always({id, resourceName, data}))
        ))
        .do(() => ToastExt.success("Zapisano!"))
        .flatMap(({resourceName, id, data}) => Rx.Observable.of(
            editResource.finish(resourceName, id, data),
            loadResources.start(resourceName)
        ))

export default ResourcesEpic = combineEpics(editConfigEpic, loadResourcesEpic, deleteResourceEpic, addResourceEpic)