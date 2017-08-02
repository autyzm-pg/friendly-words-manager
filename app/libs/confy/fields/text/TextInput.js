// @flow
import React from "react"
import {Form, Input, Item, Left, Right, Text, View} from "native-base"
import type {FieldProps} from "../fields"

type TextInputProps = { placeholder: ?string } & FieldProps<string>

const TextInput = ({value, verbose, onChange, placeholder}: TextInputProps) => (
    <Form>
        <Text>{verbose}</Text>
        <Item regular>
            <Input placeholder={placeholder} value={value} onChangeText={onChange}/>
        </Item>
    </Form>
)

export default TextInput