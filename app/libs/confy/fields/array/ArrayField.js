import ArrayInput from "./ArrayInput"
import {_renderField} from "../fields"

export const ArrayField = (verbose, field, component=undefined) => name => ({
    name,
    verbose,
    component: component || ArrayInput,
    props: {
        field: {
            ...field(),
            renderField(value, onChange) {
                return _renderField.call(this, () => value, () => onChange)
            }
        }
    },

    getDefaultValue() {
        return []
    },

    renderField: _renderField
})