// @flow
import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import Page, {PageHeader} from "../../components/layout/Page"
import {WizardStepsContainer, WizardStepView} from "./WizardSteps"
import {withRedux} from "../../libs/redux/withRedux"
import {mapDispatchToProps, mapStateToProps, reducer} from "./wizardRedux"
import * as R from "ramda"
import withProps from "../../libs/withProps"
import type {Step} from "../steps"
import type {WizardViewType} from "./wizardView"
import type {ModelType} from "../../models"
import {Modal} from "react-native"
import withModal from "../../libs/withModal"
import {withLog} from "../../libs/debug"
import {renderField} from "../../fields/fields"

type WizardPagePropsFromUser = {
    onSave: <T>(string, T) => void,
    history: any,
    name: string,
}

type WizardPageProps<T> = {
    config: T,
    onFieldChange: <V>(string) => (V) => void,
    steps: Array<Step>
} & WizardPagePropsFromUser

const WizardPage = ({steps, name, config, onFieldChange, onSave, ...props, modal}: WizardPageProps<*>) => (
    <Page>
        <PageHeader onBack={() => props.history.goBack()} header={name}>
            <Button transparent onPress={() => modal.show()}>
                <Icon name="checkmark"/>
            </Button>
        </PageHeader>
        <WizardStepsContainer>
            {
                steps.map(Step => (
                    <WizardStepView key={Step.name} name={Step.name}>
                        <Step.view.component renderField={renderField(config, onFieldChange)} {...Step.view.props} config={config}/>
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage


export const createWizardPage = <T: {}, M: ModelType<T>>(wizardView: WizardViewType<M>)=> R.compose(
    withRedux(reducer(wizardView.model.getDefaultConfig()), mapStateToProps, mapDispatchToProps),
    withProps({steps: wizardView.steps}),
    withModal(),
    withLog,
)(WizardPage)