import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import WizardPage from "../libs/confy/WizardPage"
import {connect} from "react-redux"
import {Steps} from "../config/model"

const mapStateToProps = ({wizard}) => ({
    wizard,
    steps: Steps
})

export default CreatorPage = connect(mapStateToProps)(WizardPage)