import React from "react"
import {Icon, Text} from 'native-base'
import {TouchableOpacity, StyleSheet} from "react-native"
export const EmptyState  = ({icon, description, action}) =>
    <TouchableOpacity onPress={action}>
        <Icon name={icon} />
        <Text>{description}</Text>
    </TouchableOpacity>

const style = StyleSheet.create({
    container: {

    },
    icon: {
        fontSize: 60
    },
    description: {
        fontSize: 30
    }
})