import * as R from "ramda"

export const Field = (type, defaultSettings = {}) => (settings) => ({
    type,
    def: "",
    verbose: "",
    ...defaultSettings,
    ...R.dissoc("type", settings)
})

export const TextField = Field("Text")
export const OptionField = Field("Option", {def: 0, options: []})
export const BoolField = Field("Bool", {def: false})
export const ModelListField = Field("ModelList", {def: [], model: undefined})
export const ChecklistField = Field("Checklist", {def: [], options: []})
export const ImageChecklistField = Field("ImageCheckList", {def: [], options: []})