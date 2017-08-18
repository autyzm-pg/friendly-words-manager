import * as React from "react"
import {View} from "react-native"
import CustomModal from "./CustomModal"
import Asker from "./Asker"
import {initializeModal, Modal} from "./Modal"


export class ModalRoot extends React.Component {
    constructor() {
        super()
        this.state = {isOpened: false, children: undefined}
    }

    show = (children) => this.setState({isOpened: true, children})
    hide = () => this.setState({isOpened: false})
    toggle = () => this.setState(prevState => ({isOpened: !prevState.isOpened}))
    ask = (question, positive = true) => new Promise((resolve, reject) =>
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

    componentWillMount() {
        const modalActions = {
            show: this.show,
            hide: this.hide,
            toggle: this.toggle,
            ask: this.ask,
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