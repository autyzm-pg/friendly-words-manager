import React from "react"
import {Button, Icon, List, ListItem, Right, Text,} from 'native-base'
import {TouchableOpacity, View} from "react-native"
import SearchBar from "../lists/SearchBar"


const activeTextStyle = ({
    color: "#11a42f",
})



export const ConfigElem = ({item, active, onSetActive, children}) => (
    <ListItem>
        <TouchableOpacity onPress={() => onSetActive(item.id)}>
            <View style={{flex: 1}}>
                <Text style={active ? activeTextStyle : {}}>{item.name}</Text>
                {active && <Text style={{...activeTextStyle, fontStyle: 'italic'}}> ({active})</Text>}
            </View>
        </TouchableOpacity>
        <Right>
            {children}
        </Right>
    </ListItem>
)



export default ConfigList = ({children, onSearchChange, searchQuery}) => (
    <View>
        <SearchBar onSearchChange={onSearchChange} searchQuery={searchQuery}/>
        <List style={{marginBottom: 60}}>
            {children}
        </List>
    </View>
)