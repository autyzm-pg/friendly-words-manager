import {Initializer} from "../../libs/initializers"

export const NativeBaseFontsInitializer = Initializer("LOAD_EXPO_FONTS", () => Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
}))