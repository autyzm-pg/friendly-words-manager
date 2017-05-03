import React from "react"
import {Form, Icon, Input, Item, Button} from "native-base"
import {emptyFunc} from "../../libs/funcs"

export default SearchBar = ({onSearchChange = emptyFunc, searchQuery}) => {
    let textInput = null

    const clear = () => {
        onSearchChange("")
        textInput._root.focus()
    }

    return (
        <Form>
            <Item>
                <Icon name="search"/>
                <Input placeholder="Wyszukaj"
                       value={searchQuery}
                       onChangeText={text => onSearchChange(text)}
                       ref={input => {
                           textInput = input
                       }}/>
                <Button transparent
                        onPress={clear}
                        style={{marginTop: 10}}>
                    <Icon name="close" style={{color: "#C0C0C0"}}/>
                </Button>
            </Item>
        </Form>
    )
}