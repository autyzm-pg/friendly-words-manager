import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"

import {ConfigurationWizardView} from "../config/view"


const WizardPage = createWizardPage(ConfigurationWizardView)

let wizard;
const CreatorPage = ({history}) => (
    <WizardPage ref={ref => wizard = ref} history={history}/>
)

export default CreatorPage