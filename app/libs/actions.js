import 'rxjs'

export const Action = (type, payload)  => ({type, payload})

const startActionType = type => `${type}_STARTED`
const finishActionType = type => `${type}_FINISHED`

export const plainAction = (type) => () => ({type})
export const asyncAction = (type) => ({
    start: () =>  ({type: startActionType(type)}),
    finish: payload => ({type: finishActionType(type), payload}),
    startType: startActionType(type),
    finishType: finishActionType(type)
})



