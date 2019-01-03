import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/createWizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"
import {connect} from "react-redux"
import {saveConfig, editConfig} from "../redux/configurations/actions"
import {Modal, onConfirm} from "../components/modal/Modal"
import firebase from "react-native-firebase";
import {events} from "../components/firebase/Events";
import * as constants from "../../android/app/src/main/res/constantStrings";

const createSave = (history, handler, name, config) => {
    handler(name, config)
    firebase.analytics().logEvent(events.save_configuration)
    history.goBack()
}
const onCreateSave = R.curry((allConfigNames, handler, history, config, name) => R.ifElse(
    R.any(R.equals(name)),
    () => Modal.ask(constants.StepNamed + name + constants.AlreadyExists + constants.DoYouWantToOverwriteIt, false).then(onConfirm(() => createSave(history, handler, name, config))),
    () => createSave(history, handler, name, config)
)(allConfigNames))

const WizardPage = createWizardPage(ConfigurationWizardView)

export const goBack = (history) => () => history.goBack()

const CreatorPage = ({history, saveConfig, allConfigNames}) => (
    <WizardPage name={constants.NewConfiguration} onBack={goBack(history)}
                onSave={onCreateSave(allConfigNames, saveConfig, history)}/>
)

const dispatchToProps = dispatch => ({
    saveConfig: R.compose(dispatch, saveConfig)
})

const mapStateToProps = ({configurations}) => ({
    allConfigNames: configurations.all.map(R.prop('name')),
})

export default connect(mapStateToProps, dispatchToProps)(CreatorPage)
