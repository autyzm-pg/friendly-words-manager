import React from "react"
import Provider from "react-redux/src/components/Provider"
import store from "./app/config/store"
import Layout from "./app/components/containers/Layout"
import Router from "./app/config/routes"
import Expo from 'expo'
import {Root} from "native-base"
import * as R from "ramda"
import {connect} from "react-redux"
import {startApp} from "./app/redux/app/actions"
import withCycle from "./app/libs/withCycle"
import {ModalRoot} from "./app/components/modal/ModalRoot"

const InternalApp = ({isReady}) => (
    !isReady ?
        <Expo.AppLoading/> :
        <Layout>
            <Router/>
        </Layout>
)

const mapDispatchToProp = dispatch => ({
    onEnter: () => dispatch(startApp())
})
const mapStateToProps = ({app}) => ({isReady: app.ready})

const EnhancedApp = R.compose(
    connect(mapStateToProps, mapDispatchToProp),
    withCycle({
        componentWillMount: ({onEnter}) => onEnter()
    })
)(InternalApp)

const App = () => (
    <Root>
        <ModalRoot>
            <Provider store={store}>
                <EnhancedApp/>
            </Provider>
        </ModalRoot>
    </Root>
)


export default App