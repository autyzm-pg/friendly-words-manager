import React from "react"
import {Text, View, Button} from "native-base"
import R from "ramda"
import {Image} from 'react-native'
import {addImageFromCamera, addImageFromLibrary} from "./imageHandling"
import {ifConfirmOrElse, Modal, onConfirm} from "../../../../components/modal/Modal"
import {withStyle} from "../../../withStyle"
import {catchError} from "../../libs/errors"
import {imagePickerStyles} from "./styles"
import {PlusButton} from "../../components/ui/PlusButton"
import {XButton} from "../../components/ui/XButton"

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
            addImageFromLibrary,
        ),
        () => ({cancelled: true})
    ))
    .then(R.when(
        result => !result.cancelled,
        ({uri, width, height}) => addImage({width, height, uri: `file://${uri}`})
    ))

const removeUriFromList = (uri, all) => R.pipe(
    R.propEq('uri'),
    R.complement,
    R.filter,
)(uri)(all)

const ImageContainer = ({children, onDelete}) => (
    <View>
        <View style={imagePickerStyles.imageContainer}>
            {children}
        </View>
        <XButton small style={imagePickerStyles.deleteButton} onPress={onDelete}/>
    </View>
)

const onImageDelete = onDeleteConfirmed => () =>
    Modal.ask("Czy napewno chcesz usunąć ten obrazek?", false)
        .then(onConfirm(onDeleteConfirmed))

const ImageUploader = ({verbose, value, onChange, options}) => (
    <View style={imagePickerStyles.container}>
        <View style={{flexDirection: "row"}}>
            <Text>{verbose}</Text>
            <Button style={imagePickerStyles.addButton} onPress={onImageAddPress(image => onChange([...value, image]))}>
                <Text>Dodaj</Text>
            </Button>
        </View>
        <View style={[imagePickerStyles.imagesContainer, value.length === 0 && {justifyContent: "center"}]}>
            {value.length === 0 && <Text style={imagePickerStyles.emptyText}>Brak obrazków</Text>}
            {value.map(({uri, width, height}) =>
                <ImageContainer key={uri} onDelete={onImageDelete(() => onChange(removeUriFromList(uri, value)))}>
                    {console.log("URI:", uri, width, height) && null}
                    <Image source={{uri}} style={imagePickerStyles.image}/>
                </ImageContainer>
            )}
        </View>
    </View>
)


export default ImageUploader

