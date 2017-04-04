import React from "react"
import {
    StyleSheet,
    Text,
    View
} from 'react-native'



const Main = () => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            Friendly Lines Manager
        </Text>
    </View>
)

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})