import React from "react"
import {Form, Icon, Input, Item, Button} from "native-base"
import {emptyFunc} from "../../libs/funcs"
import {Search} from "../../../android/app/src/main/res/constantStrings";
import {fontStyles} from "../../../android/app/src/main/res/fontStyle";

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
                       style={fontStyles.search}
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