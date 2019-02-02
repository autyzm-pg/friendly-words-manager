import React from "react"
import {View} from "native-base"

import {events, logEvent} from "../../../../events"

export const SinglePage = ({field, renderField, config}) => {

    if (field.name == "materials") {
        logEvent(events.change_tab_material)
    } else {
        logEvent(events.change_tab_test)
    }
    return (
        <View style={{flex: 1}}>
            {renderField(field)}
        </View>
    )
}
