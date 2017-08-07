
import configActions from "./actionTypes"

export const changeConfigsSearchQuery = (newQuery) => ({type: configActions.listQueryChange, payload: newQuery})
export const changeActiveConfig = (activeConfig) => ({type: configActions.listActiveConfigChange, payload: activeConfig})

export const saveConfig = (name, config) => {


    return ({
        type: configActions.saveConfig,
        payload: {
            name,
            config
        }
    })
}