import React from "react"
import {List, ListItem, Right, View} from "native-base"
import {TouchableOpacity} from "react-native"

export const ResourceElem = ({item, onElemClick = () => null, children}) => (
    <ListItem>
        <TouchableOpacity onPress={onElemClick}>
            <View style={{flex: 1}}>
                {item}
            </View>
        </TouchableOpacity>
        <Right>
            {children}
        </Right>
    </ListItem>
)
export const ResourceList = ({children, onSearchChange, searchQuery}) => (
    <View>
        <List style={{marginBottom: 60}}>
            {children}
        </List>
    </View>
)