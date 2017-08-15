import * as configActionsTypes from "./actionTypes"
import {plainAction} from "../../libs/actions"

export const changeConfigsSearchQuery = (newQuery) => ({type: configActionsTypes.listQueryChange, payload: newQuery})
export const changeActiveConfig = (activeConfig) => ({
    type: configActionsTypes.listActiveConfigChange,
    payload: activeConfig
})


const saveConfigFactory = action => (name, config) => ({
    type: action,
    payload: {
        name,
        config
    }
})
export const saveConfig = saveConfigFactory(configActionsTypes.saveConfig)
export const saveConfigFinish = saveConfigFactory(configActionsTypes.saveConfigFulfilled)



