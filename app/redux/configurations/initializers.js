import {loadingConfigs, loadingConfigsFulfilled} from "./actionTypes"
import {ActionInitializer} from "../../libs/initializers"


export const ConfigsInitializer = ActionInitializer(loadingConfigs, loadingConfigsFulfilled)