import React from "react"
import {Button, Icon, List, ListItem, Right, Text,} from 'native-base'
import {TouchableOpacity, View} from "react-native"
import SearchBar from "../lists/SearchBar"
import {EmptyState} from "../../libs/confy/components/ui/EmptyState";


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
        {children.length > 0
            ?<List style={{marginBottom: 60}}>
            {children}
            </List>
            : <EmptyState icon="help" description="Lista konfiguracji jest pusta"/>
        }
    </View>
)