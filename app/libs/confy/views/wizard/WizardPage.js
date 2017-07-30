import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import * as R from "ramda"
import Page, {PageHeader} from "../../components/layout/Page"
import {connect} from "react-redux";
import {WizardStepsContainer, WizardStepView} from "./WizardSteps"
import {WizardStep} from "./wizardView"

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
        <WizardStepsContainer>
            {
                wizardView.steps.map(Step => (
                    <WizardStepView key={Step.name} name={Step.name}>
                        <Step.view.component onChange={onChange} {...Step.view.props} config={config}/>
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage;

export default connect(mapStateToProps)(WizardPage)