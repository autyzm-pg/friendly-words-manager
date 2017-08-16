import * as R from "ramda"

export const Action = R.curry((type, payload)  => ({type, payload}))
export const PlainAction = type => () => ({type})

export const AsyncActionType = type => ({
    started: `${type}_STARTED`,
    finished: `${type}_FINISHED`
})

export const AsyncAction = asyncTypes => ({
    start: payload =>  ({type: asyncTypes.started, payload}),
    finish: payload => ({type: asyncTypes.finished, payload}),
})



