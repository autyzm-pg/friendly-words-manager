import React from "react"
import {Text, View} from "native-base"
import {YesNoButtons} from "../askFactory"
import {fontStyles} from "../../../../android/app/src/main/res/fontStyle";

export const Asker = ({children, onConfirm, onCancel, positive}) => (
    <View>
        <Text style={fontStyles.askerLabel}>{children}</Text>
        <YesNoButtons onCancel={onCancel} onConfirm={onConfirm} positive={positive}/>
    </View>
)