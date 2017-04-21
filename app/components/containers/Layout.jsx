import React from "react"
import styles from "./layoutStyles";
import {View} from "react-native";

export default Layout = ({children}) => (
    <View style={styles.container}>
        {children}
    </View>
)