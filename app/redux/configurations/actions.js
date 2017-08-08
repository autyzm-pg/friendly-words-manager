import configActions from "./actionTypes"

export const changeConfigsSearchQuery = (newQuery) => ({type: configActions.listQueryChange, payload: newQuery})
export const changeActiveConfig = (activeConfig) => ({
    type: configActions.listActiveConfigChange,
    payload: activeConfig
})


const saveConfigFactory = action => (name, config) => ({
    type: action,
    payload: {
        name,
        config
    }
})
export const saveConfig = saveConfigFactory(configActions.saveConfig)
export const saveConfigFinish = saveConfigFactory(configActions.saveConfigFulfilled)