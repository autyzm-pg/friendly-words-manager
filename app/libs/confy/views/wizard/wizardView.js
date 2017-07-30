// @flow
import type {ModelType} from "../../models"
import type {Step, StepView} from "../steps"


type WizardViewType<M> = {
    model: M,
    steps: Array<Step>
}

type ViewDefiner<F> = (fields: F) => Array<Step>

// type WizardViewFactoryType = (ViewDefiner, ModelType) => WizardViewType
export const WizardView = <T: {}, M: ModelType<T>>(defineView: ViewDefiner<$PropertyType<M, 'fields'>>, model: M): WizardViewType<M> => ({
    model,
    steps: defineView(model.fields)
})

type WizardStepFactory = (string, StepView) => Step
export const WizardStep: WizardStepFactory = (name, view) => ({name, view})


