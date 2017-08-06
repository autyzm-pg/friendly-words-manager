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
import withModal from "../../libs/withModal"
import {withLog} from "../../libs/debug"
import {renderField} from "../../fields/fields"
import withState from "../../libs/withState"


const enhance = component => currentName => withState({name: currentName}, state => ({name: state.name}), setState => ({onChange: val => setState({name: val})}))(component)
const WizardSaveModal = enhance(({name, onChange, onSave}) => (
    <Form>
        <Text>Podaj nazwę</Text>
        <Item regular>
            <Input value={name} onChangeText={onChange}/>
        </Item>
        <Button transparent onPress={() => onSave(name)}>
            <Icon name="checkmark"/>
        </Button>
    </Form>
))
const renderWizardSaveModal = (currentName, onSave) => {
    const Component = WizardSaveModal(currentName)
    return <Component onSave={onSave}/>
}

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
    modal: {
        show: (any) => void,
        hide: () => void
    }
} & WizardPagePropsFromUser

const WizardPage = ({steps, name, config, onFieldChange, onSave, ...props, modal}: WizardPageProps<*>) => (
    <Page>
        <PageHeader onBack={() => props.onBack()} header={name}>
            <Button transparent onPress={() => modal.show(renderWizardSaveModal(name, onSave(config)))}>
                <Icon name="checkmark"/>
            </Button>
        </PageHeader>
        <WizardStepsContainer>
            {
                steps.map(Step => (
                    <WizardStepView key={Step.name} name={Step.name}>
                        <Step.view.component renderField={renderField(config, onFieldChange)} {...Step.view.props}
                                             config={config}/>
                    </WizardStepView>
                ))
            }
        </WizardStepsContainer>
    </Page>
)

export const _WizardPage = WizardPage


export const createWizardPage = <T: {}, M: ModelType<T>>(wizardView: WizardViewType<M>) => R.compose(
    withRedux(reducer(wizardView.model.getDefaultConfig()), mapStateToProps, mapDispatchToProps),
    withProps({steps: wizardView.steps}),
    withModal(),
    withLog,
)(WizardPage)