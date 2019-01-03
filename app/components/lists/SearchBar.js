import React from "react"
import {Form, Icon, Input, Item, Button} from "native-base"
import {emptyFunc} from "../../libs/funcs"
import {Search} from "../../../android/app/src/main/res/constantStrings";

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
                <Input placeholder={Search}
                       value={searchQuery}
                       onChangeText={text => onSearchChange(text)}
                       ref={input => {
                           textInput = input
                       }}/>
                {searchQuery !== "" ?
                    <Button transparent
                            onPress={clear}>
                        <Icon name="close" style={{color: "#C0C0C0"}}/>
                    </Button>
                    : null
                }
            </Item>
        </Form>
    )
}