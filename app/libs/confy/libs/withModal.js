import {Modal, Text, View} from "react-native"
import * as React from "react"
import {withLog} from "./debug"


export default withModal = (isOpened=false) => Component => (
    class ModalWrapper extends React.Component {
        constructor() {
            super()
            this.state = {isOpened}
        }

        show = () => this.setState({isOpened:true})
        hide = () => this.setState({isOpened:false})
        toggle = () => this.setState(prevState => ({isOpened: !prevState.isOpened}))

        render() {
            const modalActions = {
                show: withLog(this.show),
                hide: this.hide,
                toggle: this.toggle,
            }
            return (
                <View style={{flex:1}}>
                    <Modal animationType={"slide"}
                           visible={this.state.isOpened}
                           transparent={false}
                           onRequestClose={()=>this.hide()}
                           style={{margin: 20}}
                    >
                        <View style={{margin: 10, backgroundColor: 'blue'}}>
                            <Text>TESTING MODAl</Text>
                        </View>
                    </Modal>
                    <Component modal={modalActions} {...this.props}/>
                </View>
            )
        }
    }
)