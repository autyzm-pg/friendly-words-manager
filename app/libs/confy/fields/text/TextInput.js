// @flow
import React from "react"
import {Form, Input, Item, Left, Right, Text, View} from "native-base"
import type {FieldProps} from "../fields"

type TextInputProps = {placeholder: ?string} & FieldProps<string>

const TextInput = ({value, verbose, onChange, placeholder}: TextInputProps) => (
    <Form>
        <Left>
            <Text>{verbose}</Text>
        </Left>
        <Right>
            <Item regular>
                <Input placeholder={placeholder} value={value} onChange={onChange}/>
            </Item>
        </Right>
    </Form>
)

export default TextInput