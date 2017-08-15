import {Initializer} from "../../libs/actions"
import {readConfigsDatabase} from "../../db"


export const ConfigsInitializer = Initializer("LOAD_CONFIGS", readConfigsDatabase)