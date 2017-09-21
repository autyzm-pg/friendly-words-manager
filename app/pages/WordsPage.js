import React from "react"
import {EnhancedResourcesPage} from "../components/containers/ResourcesPage"
import {WordModel} from "../config/model"
import {View} from "react-native"
import {Text} from "native-base"
import {withLog} from "../libs/confy/libs/debug"

const WordLabel = ({item}) => (
    <View>
        <Text>{item.toString()}</Text>
    </View>
)

export const WordsPage = EnhancedResourcesPage(WordModel.name, "Zasoby", WordLabel, withLog(res => res.name.toString()))