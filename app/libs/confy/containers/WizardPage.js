import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import * as R from "ramda"
import Page, {PageHeader} from "../components/layout/Page"
import {WizardStep, WizardStepsContainer} from "../components/steps/WizardSteps"

const mapStateToProps = ({wizard}) => ({
    fromStore: {
        //TODO : implement this
    }
})

const WizardPage = ({steps, wizard, history, view}) => (
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


export default connect(mapStateToProps)(WizardPage)