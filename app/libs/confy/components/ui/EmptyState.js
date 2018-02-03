import React from "react"
import {Icon, Text, Button} from 'native-base'
import {TouchableOpacity, StyleSheet} from "react-native"
export const EmptyState  = ({icon, description, action, actionLabel}) =>
    <TouchableOpacity onPress={action}>
        {icon && <Icon name={icon} />}
        {description && <Text>{description}</Text>}
        {actionLabel && <Button><Text>{actionLabel}</Text></Button>}
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