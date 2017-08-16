import {loadActiveConfig, loadingConfigs, loadingConfigsFulfilled} from "./actionTypes"
import {ActionInitializer} from "../../libs/initializers"


export const ConfigsInitializer = ActionInitializer(loadingConfigs, loadingConfigsFulfilled)
export const ActiveConfigInitializer = ActionInitializer(loadActiveConfig.started, loadActiveConfig.finished)