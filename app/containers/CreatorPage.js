import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import WizardPage from "../libs/confy/views/wizard/WizardPage"

import {connect} from "react-redux"
import {Steps} from "../config/model"
import {ConfigurationWizardView} from "../config/view"

const CreatorPage = ({}) => (
    <WizardPage view={ConfigurationWizardView}/>
)

export default CreatorPage