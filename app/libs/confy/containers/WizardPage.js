import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import * as R from "ramda"
import Page, {PageHeader} from "../components/layout/Page"
import {WizardStep, WizardStepsContainer} from "../components/steps/WizardSteps"
import {connect} from "react-redux";

const mapStateToProps = ({wizard}) => ({
    fromStore: {
        //TODO : implement this
    }
})

const WizardPage = ({wizardView, config, onChange, ...props}) => (
    <Page>
        <PageHeader onBack={() => props.history.goBack()}>
            Nowa konfiguracja
        </PageHeader>
        <WizardStepsContainer configurationModel={wizardView.model} activeConfig={config}>
            {
                wizardView.steps.map(step => <WizardStep key={step.name} step={step}/>)
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage;

export default connect(mapStateToProps)(WizardPage)