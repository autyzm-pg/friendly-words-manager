// @flow
import * as R from "ramda"

type ExtractTypeFunc = <V>((string) => V) => V
export type ModelType<M> = {
    fields: $ObjMap<M, ExtractTypeFunc>,
    getDefaultConfig: () => any
}

// type ModelFactoryType<M> = (M) => ({
//     fields: ModelType<M>
// })

export const Model = <M>(configDefinition: M): ModelType<M> => ({
    fields: R.compose(
        R.fromPairs,
        R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
        R.toPairs
    )(configDefinition),
    getDefaultConfig: function () {
        return R.compose(
            R.fromPairs,
            R.map(([fieldName, field]) => [fieldName, field.getDefaultValue()]),
            R.toPairs
        )(this.fields)
    }
})