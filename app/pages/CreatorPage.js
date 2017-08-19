import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"
import {connect} from "react-redux"
import {saveConfig} from "../redux/configurations/actions"
import {withLog} from "../libs/confy/libs/debug"

const onSave = R.curry((handler, history, config, name) => {
    handler(name, config)
    history.push("/configurations")
})

const WizardPage = createWizardPage(ConfigurationWizardView)

const goBack = (history) => () => history.push("/configurations")

const CreatorPage = ({history, saveConfig}) => (
    <WizardPage name="Nowa konfiguracja" onBack={goBack(history)} onSave={onSave(saveConfig, history)}/>
)

const _EditPage = ({history, saveConfig, name, config}) => {
    const EditWizardPage = createWizardPage(ConfigurationWizardView, config)

    return <EditWizardPage name={name} onBack={goBack(history)} onSave={onSave(saveConfig, history)} />
}

const dispatchToProps = dispatch => ({
    saveConfig: R.compose(dispatch, saveConfig)
})

const mapStateToPropsForEdit = ({configurations}, {match}) => ({
    name: match.params.name,
    config: configurations.all.find(R.o(R.equals(match.params.name), R.prop('name'))).config
})

export default connect(null, dispatchToProps)(CreatorPage)

export const EditPage = connect(withLog(mapStateToPropsForEdit), dispatchToProps)(_EditPage)