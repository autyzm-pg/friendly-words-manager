import React from "react"
import {Button, Icon, List, ListItem, Right, Left, Body, Text} from 'native-base'
import {TouchableOpacity, View} from "react-native"
import SearchBar from "../lists/SearchBar"
import {ListLabelsContainer, ListLabel} from "../../libs/confy/components/ui/ListLabels";
import * as constants from "../../../android/app/src/main/res/constantStrings";
import {fontStyles} from "../../../android/app/src/main/res/fontStyle";


const activeTextStyle = ({
    color: "#11a42f",
})

export const ConfigElem = ({item, active, children, onOpen}) => (
    <ListItem>
        <Body>
        <TouchableOpacity onPress={() => onOpen(item.id)}>
            <View style={{flex: 1}}>
                <Text style={[active ? activeTextStyle : {}, fontStyles.listElement] }>{item.name}</Text>
                {active && <Text style={[{...activeTextStyle, fontStyle: 'italic'},fontStyles.listElement]}> ({active})</Text>}
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
        <List>
            <ListLabelsContainer>
                <Left><ListLabel text={constants.ConfigurationName}/></Left>
                <Right><ListLabel text={constants.Actions}/></Right>
            </ListLabelsContainer>
            {children}
        </List>
    </View>
)