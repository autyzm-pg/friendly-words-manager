import React from "react"
import {
    Text,
    Icon,
    Right,
    List,
    ListItem,
} from 'native-base'
import {View} from "react-native"
import SearchBar from "../lists/SearchBar"

export const ConfigElem = ({item}) => (
    <ListItem>
        <Text>{item}</Text>
        <Right>
            <Icon name="more"/>
        </Right>
    </ListItem>
)

export default ConfigList = ({children, onSearchChange, searchQuery}) => (
    <View>
        <SearchBar onSearchChange={onSearchChange} searchQuery={searchQuery}/>
        <List>
            {children}
        </List>
    </View>
)