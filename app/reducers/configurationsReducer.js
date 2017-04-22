import {createReducer} from "../libs/reducers"
import R from "ramda"

const defaultState = {
    all: [
        "Konfiguracja 1",
        "Konfiguracja 3",
        "Konfiguracja 20",
        "Janek",
        "Maciej Paciej",
        "Jasiu Stasiu",
        "Zdzisiu Misiu"
    ],
    searchQuery: ""
}

const handlers = {
    "CONFIGURATIONS_LIST_QUERY_CHANGE": (state, action) => R.assoc('searchQuery', action.payload.toLowerCase(), state)
}

export default createReducer(defaultState,handlers)