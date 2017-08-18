import * as React from "react"
import {View} from "react-native"
import CustomModal from "./CustomModal"
import Asker, {TextAsker} from "./Asker"
import {initializeModal, Modal} from "./Modal"


const askFactory = modalRoot => AskerComponent => (question, positive = true) => new Promise((resolve, reject) =>
    modalRoot.setState({
        isOpened: true,
        children:
            <AskerComponent onConfirm={value => {
                resolve({type: "success", value})
                modalRoot.hide()
            }} onCancel={value => {
                resolve({type: "cancel", value})
                modalRoot.hide()
            }} positive={positive}>
                {question}
            </AskerComponent>
    })
)

export class ModalRoot extends React.Component {
    constructor() {
        super()
        this.state = {isOpened: false, children: undefined}
    }

    askFactory = askFactory(this)

    show = (children) => this.setState({isOpened: true, children})
    hide = () => this.setState({isOpened: false})
    toggle = () => this.setState(prevState => ({isOpened: !prevState.isOpened}))
    ask = this.askFactory(Asker)
    textAsk = (question, defaultText="", positive=true) => this.askFactory(TextAsker(defaultText))(question, positive)

    componentWillMount() {
        const modalActions = {
            show: this.show,
            hide: this.hide,
            toggle: this.toggle,
            ask: this.ask,
            textAsk: this.textAsk
        }

        initializeModal(modalActions)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
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