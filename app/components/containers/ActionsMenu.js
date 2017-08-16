import React from "react"
import * as R from "ramda"
import Menu, {MenuOption, MenuOptions, MenuTrigger} from "react-native-menu"
import {Icon, View} from "native-base"

export const ActionItem = ({onSelect, children}) => (
    <MenuOption value={onSelect}>
        {children}
    </MenuOption>
)

export const ActionsMenu = ({children}) => (
    <Menu onSelect={R.call}>
        <MenuTrigger>
            <View style={{paddingLeft:4, paddingRight:4}}>
                <Icon name="more"/>
            </View>
        </MenuTrigger>
        <MenuOptions>
            {React.Children.map(children, child => child.type({...child.props}))}
        </MenuOptions>
    </Menu>
)