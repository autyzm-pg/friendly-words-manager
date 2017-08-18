import {Modal, StatusBar, View} from "react-native"
import * as React from "react"
import {Button, Text} from "native-base"

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

const CustomModal = ({children, visible, onRequestClose}) => (
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

const askerStyles = {
    buttonsWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
    },
    buttons: {
        alignSelf: "auto"
    },
    buttonNo: {},
    buttonYes: {
        marginLeft: 10,
    }
}

const Asker = ({children, onConfirm, onCancel, positive}) => (
    <View>
        <Text>{children}</Text>
        <View style={askerStyles.buttonsWrapper}>
            <Button transparent={positive} style={{...askerStyles.buttons, ...askerStyles.buttonNo}}
                    onPress={onCancel}><Text>Nie</Text></Button>
            <Button transparent={!positive} style={{...askerStyles.buttons, ...askerStyles.buttonYes}}
                    onPress={onConfirm}><Text>Tak</Text></Button>
        </View>
    </View>
)


export default withModal = (isOpened = false, children = undefined) => Component => (
    class ModalWrapper extends React.Component {
        constructor() {
            super()
            this.state = {isOpened, children}
        }

        show = (children) => this.setState({isOpened: true, children})
        hide = () => this.setState({isOpened: false})
        toggle = () => this.setState(prevState => ({isOpened: !prevState.isOpened}))
        ask = (question, positive=true) => new Promise((resolve, reject) =>
            this.setState({
                isOpened: true,
                children:
                    <Asker onConfirm={() => {
                        resolve(true)
                        this.hide()
                    }} onCancel={() => {
                        resolve(false)
                        this.hide()
                    }} positive={positive}>
                        {question}
                    </Asker>
            })
        )

        render() {
            const modalActions = {
                show: this.show,
                hide: this.hide,
                toggle: this.toggle,
                ask: this.ask,
            }
            return (
                <View style={{flex: 1}}>
                    <Component modal={modalActions} {...this.props}/>
                    <CustomModal animationType={"slide"}
                                 visible={this.state.isOpened}
                                 transparent={true}
                                 onRequestClose={() => this.hide()}
                                 style={{margin: 20}}
                                 presentationStyle="fullScreen"
                    >
                        <View style={{margin: 10}}>
                            {this.state.children}
                        </View>
                    </CustomModal>
                </View>
            )
        }
    }
)