// @flow
import * as R from "ramda"
import {createTableForModel} from "../../db/db"

type ExtractTypeFunc = <V>((string) => V) => V
export type ModelType<M> = {
    name: string,
    fields: $ObjMap<M, ExtractTypeFunc>,
    getDefaultConfig: () => any
}

// type ModelFactoryType<M> = (M) => ({
//     fields: ModelType<M>
// })

export const Model = <M>(name: string, configDefinition: M): ModelType<M> => {
    const model = ({
        name,
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

    createTableForModel(model)

    return model
}

export const MainModel = configDefinition => Model("configs", configDefinition)