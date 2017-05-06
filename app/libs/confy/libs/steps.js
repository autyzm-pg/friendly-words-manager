import StepView from "../components/steps/StepListView"
export const Step = (name, fields) => ({type: "Step", name, fields, component: StepView})
export const FullStep = (name, field) => ({type: "Step", name, fields: [field], component: StepView})