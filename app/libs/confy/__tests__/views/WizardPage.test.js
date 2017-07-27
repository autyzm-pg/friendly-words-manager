import * as React from "react"
import renderer from "react-test-renderer"
import StepColumnView from "../../components/steps/StepColumnView"
import {shallow} from "enzyme"
import {_WizardPage as WizardPage} from "../../containers/WizardPage";


describe('Wizard component', () => {
    const dummyOnChange = () => undefined

    it("renders at all", () => {
        const tree = renderer.create(
            <WizardPage wizardView={{steps: []}} onChange={dummyOnChange} config={{}}/>
        ).toJSON()
        expect(tree).toBeTruthy()
    })
})