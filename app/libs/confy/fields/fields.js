// @flow
import FieldSimpleView from "./text/TextInput"
import * as R from "ramda"

export type BaseFieldType = {
    name: string,
    component: any,
    verbose: string,
    props: any
}

type FieldConstructor = (component: ?any, defaultSettings: ?any) => (string, any) => (string) => BaseFieldType;
export const Field: FieldConstructor = (component = FieldSimpleView, defaultSettings = {}) => (verbose, settings) => name => ({
    name,
    component,
    verbose,
    props: {
        ...defaultSettings,
        ...settings
    }
})




// export const BoolField = Field(TextInput, {def: false})
// export const ModelListField = Field(TextInput, {def: [], model: undefined})
// export const ChecklistField = Field(TextInput, {def: [], options: []})
// export const ImageChecklistField = Field(TextInput, {def: [], options: []})
// export const ArrayField = Field(TextInput, {def: []})
// export const ObjectField = Field(TextInput, {def: {}})
// export const ForeignField = Field()
// export const MultiOptionField = Field(TextInput, {options: []})
// export const UriField = Field(TextInput, {def: ""})
// export const IntegerField = Field(TextInput, {def: 0})
// export const MultiImageOptionField = Field(TextInput, {options: []})
// export const MultiColorField = Field(TextInput, {options: []})
// export const MultiSizeField = Field(TextInput, {options: []})

export const getDefaultModel = R.map(field => field.def)