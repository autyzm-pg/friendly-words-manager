// @flow
import React from "react"
import {
    Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right, View,
    Form, Item, Input
} from "native-base"
import Page, {PageHeader} from "../../components/layout/Page"
import {WizardStepsContainer, WizardStepView} from "./WizardSteps"
import {withRedux} from "../../libs/redux/withRedux"
import {mapDispatchToProps, mapStateToProps, reducer} from "./wizardRedux"
import * as R from "ramda"
import withProps from "../../libs/withProps"
import type {Step} from "../steps"
import type {WizardViewType} from "./wizardView"
import type {ModelType} from "../../models"
import {renderField} from "../../fields/fields"
import {withLink} from "../../libs/withState"
import {Modal, onConfirm} from "../../../../components/modal/Modal"


type WizardPagePropsFromUser = {
    onSave: <T>(string, T) => void,
    onBack: () => void,
    onSave: <T>(T) => (string) => void,
    name: string,
}

type WizardPageProps<T> = {
    config: T,
    onFieldChange: <V>(string) => (V) => void,
    steps: Array<Step>,
} & WizardPagePropsFromUser

const WizardPage = ({steps, name, config, onFieldChange, onSave, ...props}: WizardPageProps<*>) => (
    <Page>
        <PageHeader onBack={() => props.onBack()} header={name}>
            <Button transparent onPress={() => Modal.textAsk("Podaj nazwę kroku", name).then(onConfirm(newName => onSave(config, newName)))}>
                <Text>Zapisz</Text>
            </Button>
        </PageHeader>
        <WizardStepsContainer>
            {
                steps.map(Step => (
                    <WizardStepView key={Step.name} name={Step.name}>
                        <Step.view.component renderField={renderField(name => config[name], onFieldChange)} {...Step.view.props}
                                             config={config}/>
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage


export const createWizardPage = <T: {}, M: ModelType<T>>(wizardView: WizardViewType<M>, config: any = undefined) => R.compose(
    withRedux(reducer(config || wizardView.model.getDefaultConfig()), mapStateToProps, mapDispatchToProps),
    withProps({steps: wizardView.steps}),
)(WizardPage)