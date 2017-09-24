import * as R from "ramda"
import {_renderField} from "../fields"
import {ObjectListInput} from "./ObjectInput"

function predefinedRenderField(value, onChange) {
    return _renderField.call(this, () => value, () => onChange)
}

export const ObjectField = (verbose, fields, component = ObjectListInput) => name => ({
    name,
    verbose,
    component,
    props: {
        fields: R.compose(
            R.map(R.set(R.lensProp('renderField'), predefinedRenderField)),
            R.fromPairs,
            R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
            R.toPairs
        )(fields)
    },

    getDefaultValue() {
        console.log(this)
        return R.map(field => field.getDefaultValue(),
            this.props.fields)
    },

    renderField(getValueForName, onChange) {
        if (this.component) {
            return _renderField.call(this, getValueForName, onChange)
        }
    }
})
