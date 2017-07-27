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
type WizardViewFactoryType = ((({[string]: BaseFieldType}) => Array<Step>), ModelType) => WizardViewType

export const WizardView: WizardViewFactoryType = (defineView, model) => ({
    model,
    steps: defineView(model.fields)
})


export const WizardStep: Step = <T: StepView>(name: string, view: T) => ({name, view})

export const SectionView = notImplementedFunc
export const Section = notImplementedFunc


export type ColumnType = Array<BaseFieldType>;

export const ColumnView = (columns: Array<ColumnType>) => ({
    component: StepColumnView,
    props: {
        columns,
    }
})

export const Column = (fields: Array<BaseFieldType>) => fields