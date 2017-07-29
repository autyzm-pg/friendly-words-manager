import * as React from "react"
import renderer from "react-test-renderer"
import {shallow} from "enzyme"
import StepColumnView from "../../views/column/ColumnPage"

describe('ColumnPage component', () => {
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

    it("renders two fields from one column", () => {
        const field1 = {component: () => undefined}
        const field2 = {component: () => undefined}

        const columns = [
            [field1, field2],
        ]

        const wrapper = shallow(<StepColumnView columns={columns} onChange={dummyOnChange}/>)
        expect(wrapper.find(field1.component)).toHaveLength(1)
        expect(wrapper.find(field2.component)).toHaveLength(1)
    })

    it("Gives valid props to a rendered field", () => {
        const field = {
            component: () => undefined,
            props: {
                someProp1: 1,
                someProp2: "string prop"
            }
        }

        const columns = [
            [field],
        ]


        const wrapper = shallow(<StepColumnView columns={columns} onChange={dummyOnChange}/>)


        const expectProps = expect(wrapper.find(field.component).props())
        expectProps.toHaveProperty('someProp1', 1)
        expectProps.toHaveProperty('someProp2', "string prop")
        expectProps.toHaveProperty('onChange', dummyOnChange)
    })
})