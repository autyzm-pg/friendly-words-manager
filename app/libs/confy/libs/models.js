// @flow

import * as R from "ramda"
import type {BaseFieldType} from "./fields"

type ModelType = (configDefinition: {[string]: (name:string) => BaseFieldType}) => {
    fields: { [string]: BaseFieldType }
}

export const Model: ModelType = configDefinition => ({
    fields: R.compose(
        R.fromPairs,
        R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
        R.toPairs
    )(configDefinition)
})