// @flow

import * as R from "ramda"
import type {BaseFieldType} from "./fields"

export type ModelType = {
    fields: { [string]: BaseFieldType }
}

type ModelFactoryType = (configDefinition: {[string]: (name:string) => BaseFieldType}) => ModelType

export const Model: ModelFactoryType = configDefinition => ({
    fields: R.compose(
        R.fromPairs,
        R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
        R.toPairs
    )(configDefinition)
})