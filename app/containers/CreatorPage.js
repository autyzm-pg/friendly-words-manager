import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"

const onSave = R.curry((history, config, name) => {
    console.log("ZAPISANO!!!", config, name)
    history.push("/configurations")
})

const WizardPage = createWizardPage(ConfigurationWizardView)

const CreatorPage = ({history}) => (
    <WizardPage name="Nowa konfiguracja" onBack={() => history.back()} onSave={onSave(history)}/>
)

export default CreatorPage