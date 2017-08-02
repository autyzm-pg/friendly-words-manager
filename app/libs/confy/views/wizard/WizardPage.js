import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import Page, {PageHeader} from "../../components/layout/Page"
import {WizardStepsContainer, WizardStepView} from "./WizardSteps"
import {withRedux} from "../../libs/redux/withRedux"
import {mapDispatchToProps, mapStateToProps, reducer} from "./wizardRedux"
import * as R from "ramda"
import withProps from "../../libs/withProps"

const WizardPage = ({steps, config, onChange, ...props}) => (
    <Page>
        <PageHeader onBack={() => props.history.goBack()}>
            Nowa konfiguracja
        </PageHeader>
        <WizardStepsContainer>
            {
                steps.map(Step => (
                    <WizardStepView key={Step.name} name={Step.name}>
                        <Step.view.component onChange={onChange} {...Step.view.props} config={config}/>
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage

export const createWizardPage = wizardView => R.compose(
    withRedux(reducer(wizardView.model.getDefaultConfig()), mapStateToProps, mapDispatchToProps),
    withProps({steps: wizardView.steps}),
)(WizardPage)