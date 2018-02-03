import React from "react"
import {StyleSheet} from "react-native"
import R from "ramda"

export const styled = R.curry((Component, style) => {
    const styles = StyleSheet.create({element: style})

    return props => <Component {...props} style={[styles.element, props.style]} />
})