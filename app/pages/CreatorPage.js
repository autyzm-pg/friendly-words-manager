import React from "react"
import {createWizardPage} from "../libs/confy/views/wizard/createWizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"
import {connect} from "react-redux"
import {saveConfig} from "../redux/configurations/actions"
import {Modal, onConfirm} from "../components/modal/Modal"

import {events, logEvent} from "../events"

const createSave = (history, handler, name, config) => {
    handler(name, config)
    logEvent(events.save_configuration)
    history.goBack()
}
const onCreateSave = R.curry((allConfigNames, handler, history, config, name) => R.ifElse(
    R.any(R.equals(name)),
    () => Modal.ask(`Krok o nazwie '${name}' już istnieje. Czy napewno chcesz go nadpisać?`, false).then(onConfirm(() => createSave(history, handler, name, config))),
    () => createSave(history, handler, name, config)
)(allConfigNames))

const WizardPage = createWizardPage(ConfigurationWizardView)

export const goBack = (history) => () => history.goBack()

const CreatorPage = ({history, saveConfig, allConfigNames}) => (
    <WizardPage name="Nowa konfiguracja" onBack={goBack(history)}
                onSave={onCreateSave(allConfigNames, saveConfig, history)}/>
)

const dispatchToProps = dispatch => ({
    saveConfig: R.compose(dispatch, saveConfig)
})

const mapStateToProps = ({configurations}) => ({
    allConfigNames: configurations.all.map(R.prop('name')),
})

export default connect(mapStateToProps, dispatchToProps)(CreatorPage)
