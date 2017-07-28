// @flow
import StepListView from "../components/steps/StepListView"
import {notImplementedFunc} from "../../funcs"
import StepColumnView from "../components/steps/StepColumnView"
import type {BaseFieldType} from "./fields"
import type {ModelType} from "./models"

type StepView = {
    component: any,
    props: any
}

type Step = {
    name: string,
    view: StepView
}

type WizardViewType = {
    model: ModelType,
    steps: Array<Step>
}

type ViewDefiner = (fields: {[string]: BaseFieldType}) => Array<Step>

type WizardViewFactoryType = (ViewDefiner, ModelType) => WizardViewType

export const WizardView: WizardViewFactoryType = (defineView, model) => ({
    model,
    steps: defineView(model.fields)
})

type WizardStepFactory = (string, StepView) => Step
export const WizardStep: WizardStepFactory = (name, view) => ({name, view})

export const SectionView = notImplementedFunc
export const Section = notImplementedFunc


export type ColumnType = Array<BaseFieldType>
export const Column = (fields: Array<BaseFieldType>) => fields

type ColumnViewFactory = (columns: Array<ColumnType>) => StepView
export const ColumnView: ColumnViewFactory = columns => ({
    component: StepColumnView,
    props: {
        columns,
    }
})
