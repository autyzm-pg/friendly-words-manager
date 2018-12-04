import React from "react"
import {View} from "native-base"
import firebase from "react-native-firebase";
import {events} from "../../../../components/firebase/Events";

export const SinglePage = ({field, renderField, config}) => {

    if (field.name == "materials") {
        firebase.analytics().logEvent(events.change_tab_material)
    }
    else {
        firebase.analytics().logEvent(events.change_tab_test)
    }
    return (
        <View style={{flex: 1}}>
            {renderField(field)}
        </View>
    )
}
