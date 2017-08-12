import * as appActionTypes from "./actionTypes"
import {initAction, plainAction} from "../actions"
import Expo from 'expo'

export const startApp = plainAction(appActionTypes.startedApp)
export const finishStartingApp = plainAction(appActionTypes.finishedStartingApp)

export const initNativeBaseFonts = initAction("LOAD_EXPO_FONTS", () => Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
}))