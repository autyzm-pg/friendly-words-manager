import {Modal, StatusBar, Text, View} from "react-native"
import * as React from "react"
import {withLog} from "./debug"
import {Dimensions} from "react-native"

// const Modal = ({children}) => {
//     console.log(Dimensions.get('window'))
//     return <View style={styles.wrapper}>
//         <View style={styles.internal(Dimensions.get('window'))}>
//             {children}
//         </View>
//     </View>
// }
//


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

const styles = {
    wrapper: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0, 0.5)",
    },
    internal: {
        backgroundColor: "white",
        padding: 10,
        marginLeft: 6,
        marginRight: 6
    }
}

export default withModal = (isOpened = false, children=undefined) => Component => (
    class ModalWrapper extends React.Component {
        constructor() {
            super()
            this.state = {isOpened, children}
        }

        show = (children) => this.setState({isOpened: true, children})
        hide = () => this.setState({isOpened: false})
        toggle = () => this.setState(prevState => ({isOpened: !prevState.isOpened}))

        render() {
            const modalActions = {
                show: this.show,
                hide: this.hide,
                toggle: this.toggle,
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