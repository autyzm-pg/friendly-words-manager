import {Modal, View, Button} from "react-native"
import * as React from "react"
import {XButton} from "../../libs/confy/components/ui/XButton";

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
        margin: 10
    },
}

export default CustomModal = ({children, visible, onRequestClose}) => (
    <Modal animationType={"slide"}
           visible={visible}
           transparent={true}
           onRequestClose={onRequestClose}
    >
        <View style={styles.wrapper}>
            <View style={styles.internal}>
                <XButton onPress={onRequestClose} />
                {children}
            </View>
        </View>
    </Modal>
)





