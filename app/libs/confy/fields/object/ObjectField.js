import * as R from "ramda"
import {_renderField} from "../fields"
import {ObjectListInput} from "./ObjectInput"

function predefinedRenderField(value, onChange, config, path) {
    return _renderField.call(this, () => value, () => onChange, config, path)
}

export const ObjectField = (verbose, fields, settings = {}, component = ObjectListInput) => name => ({
    name,
    verbose,
    component,
    dynamicMapper: () => ({}),
    props: {
        fields: R.compose(
            R.map(R.set(R.lensProp('renderField'), predefinedRenderField)),
            R.fromPairs,
            R.map(([fieldName, fieldFunc]) => [fieldName, fieldFunc(fieldName)]),
            R.toPairs
        )(fields),
        hiddenFields: settings.hidden || []
    },

    getDefaultValue() {
        console.log(this)
        return R.map(field => field.getDefaultValue(),
            this.props.fields)
    },

    renderField: _renderField
})
