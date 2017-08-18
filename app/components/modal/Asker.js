import React from "react"
import {View} from "react-native"
import {Button, Text} from "native-base"

const askerStyles = {
    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
    },
    buttons: {
        alignSelf: "auto"
    },
    buttonNo: {},
    buttonYes: {
        marginLeft: 10,
    }
}
export default Asker = ({children, onConfirm, onCancel, positive}) => (
    <View>
        <Text>{children}</Text>
        <View style={askerStyles.buttonsWrapper}>
            <Button transparent={positive} style={{...askerStyles.buttons, ...askerStyles.buttonNo}}
                    onPress={onCancel}><Text>Nie</Text></Button>
            <Button transparent={!positive} style={{...askerStyles.buttons, ...askerStyles.buttonYes}}
                    onPress={onConfirm}><Text>Tak</Text></Button>
        </View>
    </View>
)