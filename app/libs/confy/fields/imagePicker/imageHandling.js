import {catchError} from "../../libs/errors"
import {uploadAssetsDirectory} from "../../../../fileSystem/paths"
import path from "path"
import R from "ramda"
import {copyAsync} from "../../../../fileSystem/file"

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
        copyAsync(data.from, data.uri).then(R.always(data))
    )
    .catch(catchError(CanceledError))

export const addImageFromLibrary = addImage(() => Promise.reject("NO IMAGE PICKER FROM LIBRARY"))
export const addImageFromCamera = addImage(() => Promise.reject("NO IMAGE PICKER FROM CAMERA"))