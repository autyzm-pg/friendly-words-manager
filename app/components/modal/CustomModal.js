import {Modal, View} from "react-native"
import * as React from "react"

const styles = {
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0, 0.5)",
    },
    internal: {
        backgroundColor: "white",
        padding: 10,
        marginLeft: 6,
        marginRight: 6
    }
}

export default CustomModal = ({children, visible, onRequestClose}) => (
    <Modal animationType={"slide"}
           visible={visible}
           transparent={true}
           onRequestClose={onRequestClose}
           presentationStyle="fullScreen"
    >
        <View style={styles.wrapper}>
            <View style={styles.internal}>
                {children}
            </View>
        </View>
    </Modal>
)





