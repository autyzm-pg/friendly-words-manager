import React from "react"
import {Text} from 'native-base'
import {View} from "react-native"
import {fontStyles} from "../../../../../android/app/src/main/res/fontStyle";

export const ListLabelsContainer = ({children}) => <View style={{flex: 1, flexDirection: "row", padding: 24}}>
    {children}
</View>

export const ListLabel = ({text}) => <Text style={fontStyles.listLabel}>{text.toUpperCase()}</Text>