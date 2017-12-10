import {catchError} from "../../libs/errors"
import {uploadAssetsDirectory} from "../../fileSystem/paths"
import path from "path"
import R from "ramda"
import Expo, {FileSystem} from "expo"

export const CanceledError = "Cancelled image picking"

export const addImage = asyncPicker => () => asyncPicker({allowsEditing: true})
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
    .catch(catchError(CanceledError))

export const addImageFromLibrary = addImage(Expo.ImagePicker.launchImageLibraryAsync)
export const addImageFromCamera = addImage(Expo.ImagePicker.launchCameraAsync)