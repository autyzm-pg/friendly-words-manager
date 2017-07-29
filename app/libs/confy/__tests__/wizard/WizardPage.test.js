import * as React from "react"
import renderer from "react-test-renderer"
import {shallow} from "enzyme"
import {_WizardPage as WizardPage} from "../../views/wizard/WizardPage";


describe('Wizard component', () => {
    const dummyOnChange = () => undefined

    it("renders at all", () => {
        const tree = renderer.create(
            <WizardPage wizardView={{steps: []}} onChange={dummyOnChange} config={{}}/>
        ).toJSON()
        expect(tree).toBeTruthy()
    })

    it("renders a step view component", () => {
        const step = {
            view: {
                component: () => undefined
            }
        }
        const wizardViewMock = {steps: [step]}

        const wrapper = shallow(<WizardPage wizardView={wizardViewMock} config={{}} onChange={dummyOnChange}/>)
        expect(wrapper.find(step.view.component)).toHaveLength(1)
    })

    it("Gives an onChange handler as a prop to step view component", () => {
        const step = {
            view: {
                component: () => undefined
            }
        }
        const wizardViewMock = {steps: [step]}

        const wrapper = shallow(<WizardPage wizardView={wizardViewMock} config={{}} onChange={dummyOnChange}/>)

        expect(wrapper.find(step.view.component).props()).toHaveProperty('onChange', dummyOnChange)
    })
})