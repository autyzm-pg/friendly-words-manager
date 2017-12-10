import React from "react"
import {Text, View, Button} from "native-base"
import R from "ramda"
import {Image} from 'react-native'
import {withLog} from "../../libs/debug"
import {addImageFromCamera, addImageFromLibrary} from "./imageHandling"
import {ifConfirmOrElse, Modal, onConfirm} from "../../../../components/modal/Modal"
import {withStyle} from "../../../withStyle"
import {catchError} from "../../libs/errors"

const styles = {
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    buttons: {
        marginLeft: 5,
        marginRight: 5,
    }
}

const StyledButton = withStyle(styles.buttons)(Button)
const ButtonsContainer = withStyle(styles.buttonsContainer)(View)

const SourceOptions = {
    camera: "camera",
    device: "device"
}

const SourceChooser = ({onConfirm, onCancel}) => (
    <View>
        <Text>Dodaj obraz:</Text>
        <ButtonsContainer>
            <StyledButton onPress={() => onConfirm(SourceOptions.camera)}>
                <Text>Zrób zdjęcie</Text>
            </StyledButton>
            <StyledButton onPress={() => onConfirm(SourceOptions.device)}>
                <Text>Dodaj z urządzenia</Text>
            </StyledButton>
        </ButtonsContainer>
        <Button onPress={onCancel}><Text>Anuluj</Text></Button>
    </View>
)

const onImageAddPress = addImage => () => Modal.custom(SourceChooser)
    .then(ifConfirmOrElse(
        R.ifElse(
            R.equals(SourceOptions.camera),
            addImageFromCamera,
            addImageFromLibrary
        ),
        () => ({cancelled: true})
    ))
    .then(R.when(
        result => !result.cancelled,
        addImage
    ))

const ImageUploader = ({verbose, value, onChange, options}) => (
    <View>
        <Text>{verbose}</Text>
        <View>
            {value.map(({uri, width, height}) => <Image key={uri} source={{uri}} style={{width, height}}/>)}
        </View>
        <Button onPress={onImageAddPress(image => onChange([...value, image]))}>
            <Text>Dodaj obrazek</Text>
        </Button>
    </View>
)


export default ImageUploader

