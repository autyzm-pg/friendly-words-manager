import {Toast} from "native-base"
import {fontStyles} from "../../android/app/src/main/res/fontStyle";

export default ToastExt = {
    success: (text, options = {}) => {
        Toast.show({
            text,
            position: "bottom",
            buttonText: "OK",
            type: "success",
            duration: 12000,
            textStyle: fontStyles.bottomInformation,
            ...options
        })
    }
}