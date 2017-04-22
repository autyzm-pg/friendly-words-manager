import R from "ramda"

export const createReducer = (defaultState, handlers) =>
    (state = defaultState, action) =>
        R.propOr(R.identity, action.type, handlers)(state, action)
