import React from "react"
import {Button, Icon, List, ListItem, Right, Left, Body, Text} from 'native-base'
import {TouchableOpacity, View} from "react-native"
import SearchBar from "../lists/SearchBar"
import {EmptyState} from "../../libs/confy/components/ui/EmptyState";
const activeTextStyle = ({
    color: "#11a42f",
})

export const ConfigElem = ({item, active, onSetActive, children}) => (
    <ListItem>
        <Body>
        <TouchableOpacity onPress={() => onSetActive(item.id)}>
            <View style={{flex: 1}}>
                <Text style={active ? activeTextStyle : {}}>{item.name}</Text>
                {active && <Text style={{...activeTextStyle, fontStyle: 'italic'}}> ({active})</Text>}
            </View>
        </TouchableOpacity>
        </Body>
        <Right>
            {children}
        </Right>
    </ListItem>
)

export default ConfigList = ({children, onSearchChange, searchQuery}) => (
    <View>
        <SearchBar onSearchChange={onSearchChange} searchQuery={searchQuery}/>
        {children.length > 0
            ?
                <List>
                    <View style={{flex: 1, flexDirection: "row", padding: 24}}>
                        <Left><Text style={{color: "gray"}}>NAZWA KONFIGURACJI</Text></Left>
                        <Right><Text style={{color: "gray"}}>AKCJE</Text></Right>
                    </View>
                    {children}
                </List>
            :
            <EmptyState icon="settings" description="Lista konfiguracji jest pusta" actionLabel="Utwórz konfiguracje"/>
        }
    </View>
)