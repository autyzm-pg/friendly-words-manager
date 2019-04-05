import React from "react"
import {View} from "native-base"

export const SinglePage = ({field, renderField, config}) => {
    return (
        <View style={{flex: 1}}>
            {renderField(field)}
        </View>
    )
}
