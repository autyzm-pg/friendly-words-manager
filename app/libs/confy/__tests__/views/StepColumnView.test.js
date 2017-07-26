import * as React from "react"
import renderer from "react-test-renderer"
import StepColumnView from "../../components/steps/StepColumnView"
import {shallow} from "enzyme"

describe('StepColumnView component', () => {
    const dummyOnChange = () => undefined

    it("renders at all", () => {
        const columns = []

        const tree = renderer.create(
            <StepColumnView columns={columns} onChange={dummyOnChange}/>
        ).toJSON()
        expect(tree).toBeTruthy()
    })

    it("renders two fields from two columns", () => {
        const field1 = {component: () => undefined}
        const field2 = {component: () => undefined}

        const columns = [
            [field1],
            [field2],
        ]

        const wrapper = shallow(<StepColumnView columns={columns} onChange={dummyOnChange}/>)
        expect(wrapper.find(field1.component)).toHaveLength(1)
        expect(wrapper.find(field2.component)).toHaveLength(1)
    })
})