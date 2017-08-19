import React from "react"
import {View} from "react-native"
import {Button, Form, Input, Item, Text} from "native-base"
import {withLink} from "../../libs/confy/libs/withState"
import {withLog} from "../../libs/confy/libs/debug"

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

const Buttons = (positiveText, negativeText) => ({onCancel, onConfirm, positive}) =>
    <View style={askerStyles.buttonsWrapper}>
        <Button transparent={positive} style={{...askerStyles.buttons, ...askerStyles.buttonNo}}
                onPress={onCancel}><Text>{negativeText}</Text></Button>
        <Button transparent={!positive} style={{...askerStyles.buttons, ...askerStyles.buttonYes}}
                onPress={onConfirm}><Text>{positiveText}</Text></Button>
    </View>

const YesNoButtons = Buttons("Tak", "Nie")
const SaveButtons = Buttons("Zapisz", "Anuluj")

export default Asker = ({children, onConfirm, onCancel, positive}) => (
    <View>
        <Text>{children}</Text>
        <YesNoButtons onCancel={onCancel} onConfirm={onConfirm} positive={positive}/>
    </View>
)


const textAskerStyles = {
    form: {
        width: 400,
    },
    question: {
        marginBottom: 20
    }
}

export const TextAsker = defaultText =>
    withLink("text", defaultText)(
        ({children, onConfirm, onCancel, positive, text, textChange}) => (
            <Form style={textAskerStyles.form}>
                <Text style={textAskerStyles.question}>{children}</Text>
                <Item regular>
                    <Input value={text} onChangeText={textChange}/>
                </Item>
                <SaveButtons onCancel={() => onCancel(text)} onConfirm={() => onConfirm(text)} positive={positive}/>
            </Form>
        )
    )

export const askFactory = withLog(actions => AskerComponent => (question, positive = true) => new Promise((resolve, reject) =>
    actions.show(
        <AskerComponent onConfirm={value => {
            resolve({type: "success", value})
            actions.hide()
        }} onCancel={value => {
            resolve({type: "cancel", value})
            actions.hide()
        }} positive={positive}>
            {question}
        </AskerComponent>
    )))