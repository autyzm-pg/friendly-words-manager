import * as React from "react"
import renderer from "react-test-renderer"
import {shallow} from "enzyme"
import {_WizardPage as WizardPage} from "../../views/wizard/WizardPage";


describe('Wizard component', () => {
    const dummyOnChange = () => undefined

    it("renders at all", () => {
        const tree = renderer.create(
            <WizardPage steps={[]} onChange={dummyOnChange} config={{}}/>
        ).toJSON()
        expect(tree).toBeTruthy()
    })

    it("renders a step view component", () => {
        const step = {
            view: {
                component: () => undefined
            }
        }
        const wizardViewMock = [step]

        const wrapper = shallow(<WizardPage steps={wizardViewMock} config={{}} onChange={dummyOnChange}/>)
        expect(wrapper.find(step.view.component)).toHaveLength(1)
    })

    it("Gives valid props to step view component", () => {
        const step = {
            view: {
                component: () => undefined,
                props: {
                    prop1: "prop 1 value",
                    prop2: "prop 2 value"
                }
            }
        }
        const wizardViewMock = [step]

        const wrapper = shallow(<WizardPage steps={wizardViewMock} config={{}} onChange={dummyOnChange}/>)

        expect(wrapper.find(step.view.component).props()).toHaveProperty('prop1', step.view.props.prop1)
        expect(wrapper.find(step.view.component).props()).toHaveProperty('prop2', step.view.props.prop2)
    })

    it("Gives an onChange handler as a prop to step view component", () => {
        const step = {
            view: {
                component: () => undefined
            }
        }
        const wizardViewMock = [step]

        const wrapper = shallow(<WizardPage steps={wizardViewMock} config={{}} onChange={dummyOnChange}/>)

        expect(wrapper.find(step.view.component).props()).toHaveProperty('onChange', dummyOnChange)
    })

    it("Gives a config prop to step view component", () => {
        const step = {
            view: {
                component: () => undefined
            }
        }
        const wizardViewMock = [step]
        const someConfig = {}

        const wrapper = shallow(<WizardPage steps={wizardViewMock} config={someConfig} onChange={dummyOnChange}/>)

        expect(wrapper.find(step.view.component).props()).toHaveProperty('config', someConfig)
    })
})