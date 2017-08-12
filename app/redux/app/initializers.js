import {initNativeBaseFonts} from "./actions"
import * as R from "ramda"
import {initLoadConfigs} from "../configurations/actions"

export default initializers = [
    initNativeBaseFonts,
    initLoadConfigs
]