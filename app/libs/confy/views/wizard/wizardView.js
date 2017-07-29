// @flow
import {notImplementedFunc} from "../../../funcs"
import type {BaseFieldType} from "../../libs/fields"
import type {ModelType} from "../../libs/models"
import type {Step} from "../steps";


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



