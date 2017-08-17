import React from "react"
import * as R from "ramda"
import {Button, Icon, View} from "native-base"

export const ActionItem = ({onSelect, children}) => (
    <Button onPress={onSelect} transparent style={{marginLeft:5}}>
        {children}
    </Button>
)

export const ActionsMenu = ({children}) => (
    <View style={{flex:1, flexDirection: "row"}}>
        {children}
    </View>
)