import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"
import {connect} from "react-redux"
import {saveConfig} from "../redux/configurations/actions"

const onSave = R.curry((handler, history, config, name) => {
    console.log("ZAPISANO!!!", config, name)
    handler(name, config)
    history.push("/configurations")
})

const WizardPage = createWizardPage(ConfigurationWizardView)

const CreatorPage = ({history, saveConfig}) => (
    <WizardPage name="Nowa konfiguracja" onBack={() => history.back()} onSave={onSave(saveConfig, history)}/>
)

const dispatchToProps = dispatch => ({
    saveConfig: R.compose(dispatch, saveConfig)
})

export default connect(null, dispatchToProps)(CreatorPage)