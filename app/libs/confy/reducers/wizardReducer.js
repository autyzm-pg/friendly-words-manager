import {getDefaultModel} from "../fields"
const defaultState = {
    model: undefined,
    activeConfig: {}
}

export const wizardReducer = model => {
    const newDefaultState = {
        ...defaultState,
        model: model,
        activeConfig: getDefaultModel(model)
    }

    return (state = newDefaultState, action) => {
        return state
    }
}