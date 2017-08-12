import 'rxjs'
import * as R from "ramda"
import Rx from "rxjs/Rx"

export const plainAction = (type) => () => ({type})

const makeTypes = baseType => ({
    start: `@INIT_${baseType}`,
    finish: `@INIT_${baseType}_FINISHED`
})

export const initAction = (type, promiseFactory) => ((types => ({
    startAction: () => ({type: types.start}),
    finishType: types.finish,
    epic: action$ =>
        action$.ofType(types.start).take(1)
            .flatMap(() => Rx.Observable.fromPromise(promiseFactory()))
            .map(payload => ({type: types.finish, payload}))
}))(makeTypes(type)))