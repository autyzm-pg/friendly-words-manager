import React from "react"
import {View} from "react-native"
import {Icon, Text} from "native-base"

import styles from "./sorterStyles"
import {SortAlphabetically} from "../../../android/app/src/main/res/constantStrings";

export default Sorter = () => (
    <View style={styles.container}>
        <Text style={{textAlign: "right"}}>{SortAlphabetically}<Icon name="arrow-dropdown"/></Text>
    </View>
)