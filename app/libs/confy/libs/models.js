// @flow

import * as R from "ramda"

type ModelType = <T>(configDefinition: T) => {
    fields: *
}

export const Model: ModelType = configDefinition => ({
    fields: R.compose(
        R.fromPairs,
        R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
        R.toPairs
    )(configDefinition)
})