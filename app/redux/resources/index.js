
import {createResourcesReducerFromModels} from "./reducers"
import {WordModel} from "../../config/model"
import {createResourceInitializerFromModel} from "./initializers"

export ResourcesEpic from "./epics"

export const ResourcesReducer = createResourcesReducerFromModels([WordModel])
export const ResourcesInitializers = [
    createResourceInitializerFromModel(WordModel)
]