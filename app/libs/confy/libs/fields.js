// @flow
import * as R from "ramda"
import FieldPickerView from "../components/fields/FieldPickerView"
import FieldSimpleView from "../components/fields/FieldSimpleView"

export type BaseFieldType = {
    name: string,
    component: any,
    verbose: string,
    props: any
}

type FieldConstructor = (component: ?any, defaultSettings: ?any) => (string, any) => (string) => BaseFieldType;


export const Field: FieldConstructor = (component=FieldSimpleView, defaultSettings = {}) => (verbose, settings) => name => ({
    name,
    component,
    verbose,
    props: {
        ...defaultSettings,
        ...settings
    }
})

export const TextField = Field(FieldSimpleView, {def: ""})

export const OptionField = Field(FieldPickerView, {def: 0, options: []})

export const BoolField = Field(FieldSimpleView, {def: false})

export const ModelListField = Field(FieldSimpleView, {def: [], model: undefined})

export const ChecklistField = Field(FieldSimpleView, {def: [], options: []})

export const ImageChecklistField = Field(FieldSimpleView, {def: [], options: []})

export const ArrayField = Field(FieldSimpleView, {def: []})

export const ObjectField = Field(FieldSimpleView, {def: {}})

export const ForeignField = Field()

export const MultiOptionField = Field(FieldSimpleView, {options: []})

export const UriField = Field(FieldSimpleView, {def: ""})

export const IntegerField = Field(FieldSimpleView, {def: 0})

export const MultiImageOptionField = Field(FieldSimpleView, {options: []})

export const MultiColorField = Field(FieldSimpleView, {options: []})

export const MultiSizeField = Field(FieldSimpleView, {options: []})


export const getDefaultModel = R.map(field => field.def)