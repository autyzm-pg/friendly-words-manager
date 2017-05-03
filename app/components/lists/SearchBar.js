import React from "react"
import {Form, Icon, Input, Item} from "native-base"
import {emptyFunc} from "../../libs/funcs"

export default SearchBar = ({onSearchChange=emptyFunc}) => (
    <Form>
        <Item>
            <Icon name="search"/>
            <Input placeholder="Wyszukaj" onSubmitEditing={e => onSearchChange(e.nativeEvent.text)}/>
        </Item>
    </Form>
)