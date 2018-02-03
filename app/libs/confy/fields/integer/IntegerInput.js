import React from "react"
import styles from "./styles"
import {Form, Input, Item, Text as BaseText} from "native-base"
import {Text, TextInput, TouchableOpacity, View} from "react-native"
import R from "ramda"
import withState, {withLink} from "../../libs/withState"
import ConfyTextInput from "../text/TextInput"

const not = R.complement
const hasUnit = unit => !(R.isEmpty(unit) || R.isNil(unit))

const onValueChange = (onChange, min, max) => R.when(
    newValue => newValue >= min && newValue <= max,
    newValue => onChange(newValue)
)

const onTextChange = (onChange, unit) => R.pipe(
    R.when(
        () => hasUnit(unit),
        value => value.replace(unit, "")
    ),
    parseInt,
    R.when(
        not(isNaN),
        value => onChange(value)
    )
)

const SimpleIntegerInput = ({verbose, value, onChange, min, max, unit, isFocused, isFocusedChange}) => {
    const validatedOnChange = onValueChange(onChange, min, max)
    const parsedOnChange = onTextChange(validatedOnChange, unit)

    const valueWithUnit = `${value}` + ((!isFocused && hasUnit(unit)) ? ` ${unit}` : "")

    return (
        <View style={styles.fieldContainer}>
            <BaseText>{verbose}</BaseText>
            <Form style={styles.inputContainer}>
                <TouchableOpacity style={styles.button} onPress={() => validatedOnChange(value - 1)}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Item regular style={styles.item}>
                    {/*<Input onFocus={() => isFocusedChange(true)} onBlur={() => isFocusedChange(false)}*/}
                    {/*style={styles.input}*/}
                    {/*value={valueWithUnit} onChangeText={parsedOnChange}/>*/}
                    <Input onFocus={() => isFocusedChange(true)} onBlur={() => isFocusedChange(false)}
                           style={styles.input}
                           keyboardType={"numeric"}
                           value={valueWithUnit} onChangeText={parsedOnChange}/>
                </Item>
                <TouchableOpacity style={styles.button} onPress={() => validatedOnChange(value + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </Form>
        </View>
    )
}

export const IntegerInput = withLink("isFocused", false)(SimpleIntegerInput)