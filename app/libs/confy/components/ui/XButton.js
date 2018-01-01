import React from "react"
import {Button, Text} from "native-base"
import {StyleSheet} from "react-native"

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#d6d6d6",
        borderRadius: 200,
        borderWidth: 1,
        borderColor: "#999999",
        width: 50,
        height: 50,
        padding: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingBottom: 0,
        paddingRight: 0,
        justifyContent: "center",
    },
    x: {
        fontSize: 32,
        color: "#6a6a6a"
    }
})

const smallStyles = StyleSheet.create({
    button: {
        width: 30,
        height: 30,
    },
    x: {
        fontSize: 16
    }
})

export const XButton = ({onPress, style, small}) => (
    <Button style={[styles.button, small && smallStyles.button, style]} onPress={onPress}>
        <Text style={[styles.x, small && smallStyles.x]}>X</Text>
    </Button>
)