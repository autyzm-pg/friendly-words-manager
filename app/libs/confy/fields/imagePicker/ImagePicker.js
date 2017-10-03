import React from "react"
import {Text, View, Button} from "native-base"
import R from "ramda"
import withState from "../../libs/withState"
import {ImagePicker as ExpoImagePicker, FileSystem} from "expo"
import {Image} from 'react-native'
import {withLog} from "../../libs/debug"
import path from "path"
import {uploadAssetsDirectory} from "../../fileSystem/paths"

const CanceledError = "Cancelled image picking"

const addImage = () => ExpoImagePicker.launchImageLibraryAsync({allowsEditing: true})
    .then(R.when(
        result => result.cancelled,
        () => {
            throw CanceledError
        }
    ))
    .then(({uri, width, height}) => ({
        width,
        height,
        cancelled: false,
        from: uri,
        uri: path.join(uploadAssetsDirectory, path.basename(uri))
    }))
    .then(data =>
        FileSystem.copyAsync({from: data.from, to: data.uri}).then(R.always(data))
    )
    .catch(error => {
        if(error === CanceledError) {
            return {cancelled: true}
        }
        throw error
    })

const ImageUploader = ({verbose, value, onChange, options}) => (
    <View>
        <Text>{verbose}</Text>
        <View>
            {value.map(({uri, width, height}) => <Image key={uri} source={{uri}} style={{width, height}}/>)}
        </View>
        <Button onPress={() => addImage().then(
            R.when(
                withLog(result => !result.cancelled),
                withLog(({uri, width, height}) => onChange([...value, {uri, width, height}]))
            )
        )}><Text>Dodaj obrazek</Text></Button>
    </View>
)


export default ImageUploader

