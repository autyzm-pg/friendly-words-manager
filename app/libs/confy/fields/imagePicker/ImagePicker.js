import React from "react"
import {Text, View, Button} from "native-base"
import R from "ramda"
import withState from "../../libs/withState"
import {ImagePicker as ExpoImagePicker} from "expo"
import {Image} from 'react-native'
import {withLog} from "../../libs/debug"

const ImagePicker = ({verbose, value, onChange, options, addImage}) => (
    <View>
        <Text>{verbose}</Text>
        <View>
            {options.map(({uri, width, height}) => <Image key={uri} source={{uri}} style={{width, height}}/>)}
        </View>
        <Button onPress={addImage}><Text>Dodaj obrazek</Text></Button>
    </View>
)

const setStateToProps = (setState, props) => ({
    addImage: () => ExpoImagePicker.launchImageLibraryAsync({allowsEditing: true})
        .then(R.when(
            result => !result.cancelled,
            ({uri, width, height}) => setState({options: [...props.options, {uri,width,height}]})
        ))
})

export default R.compose(
    withState({options: []}, R.identity, setStateToProps)
)(ImagePicker)

