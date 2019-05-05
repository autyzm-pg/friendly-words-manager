import React from "react"
import {Button, Text} from "native-base"
import {fontStyles as fontStyle} from "../../../../../android/app/src/main/res/fontStyle";

export const HeaderButton = ({action, text}) => <Button small onPress={action}><Text style={fontStyle.headerButton}>{text}</Text></Button>