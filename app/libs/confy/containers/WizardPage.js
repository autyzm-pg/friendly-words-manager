import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import * as R from "ramda"
import Page, {PageHeader} from "../components/layout/Page"
import {WizardStep, WizardStepsContainer} from "../components/steps/WizardSteps"


export default WizardPage = ({steps, wizard, history}) => (
    <Page>
        <PageHeader onBack={() => history.goBack()}>
            Nowa konfiguracja
        </PageHeader>
        <WizardStepsContainer configurationModel={wizard.model} activeConfig={wizard.activeConfig}>
            {
                steps.map(step => <WizardStep key={step.name} step={step}/>)
            }
        </WizardStepsContainer>
    </Page>
)