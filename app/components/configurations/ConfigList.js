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
    <ListItem key={item}>
        <Text>{item}</Text>
        <Right>
            <Icon name="more"/>
        </Right>
    </ListItem>
)

export default ConfigList = ({children, onSearchChange}) => (
    <View>
        <SearchBar onSearchChange={onSearchChange}/>
        <List>
            {children}
        </List>
    </View>
)