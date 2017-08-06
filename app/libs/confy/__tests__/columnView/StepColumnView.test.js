import * as React from "react"

import {shallow} from "enzyme"
import ColumnPage from "../../views/column/ColumnPage"

describe('ColumnPage component', () => {
    const dummyOnChange = () => undefined
    const dummyConfig = {}

    it("renders at all", () => {
        const columns = []

        const tree = shallow(
            <ColumnPage columns={columns} onChange={dummyOnChange} config={dummyConfig}/>
        )
        expect(tree).toBeTruthy()
    })

    it("renders two fields from two columns", () => {
        const field1 = {component: () => undefined}
        const field2 = {component: () => undefined}

        const columns = [
            [field1],
            [field2],
        ]

        const wrapper = shallow(<ColumnPage columns={columns} onChange={dummyOnChange} config={dummyConfig}/>)
        expect(wrapper.find(field1.component)).toHaveLength(1)
        expect(wrapper.find(field2.component)).toHaveLength(1)
    })

    it("renders two fields from one column", () => {
        const field1 = {component: () => undefined}
        const field2 = {component: () => undefined}

        const columns = [
            [field1, field2],
        ]

        const wrapper = shallow(<ColumnPage columns={columns} onChange={dummyOnChange} config={dummyConfig}/>)
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


        const wrapper = shallow(<ColumnPage columns={columns} onChange={dummyOnChange} config={dummyConfig}/>)


        const expectProps = expect(wrapper.find(field.component).props())
        expectProps.toHaveProperty('someProp1', 1)
        expectProps.toHaveProperty('someProp2', "string prop")
    })

    it("Gives an onChange handler as a prop to field component", () => {
        const field = {
            component: () => undefined,
            props: {}
        }

        const columns = [
            [field],
        ]

        const expectedOnChange = jest.fn()
        expectedOnChange.mockReturnValue(expectedOnChange)

        const wrapper = shallow(<ColumnPage columns={columns} onChange={expectedOnChange} config={dummyConfig}/>)

        expect(wrapper.find(field.component).props()).toHaveProperty('onChange', expectedOnChange)
    })

    it("Gives onChange callback and injects a valid field name to it in partial application", () => {
        const field = {
            name: "field name expected in the onChange partial application",
            component: () => undefined,
            props: {}
        }
        const columns = [
            [field],
        ]
        const onChangeHandler = jest.fn()

        shallow(<ColumnPage columns={columns} onChange={onChangeHandler} config={dummyConfig}/>)

        expect(onChangeHandler).toBeCalledWith([field.name])
    })

    it("Gives current value from a config to a corresponding field component", () => {
        const fieldNameInConfig = "SomeFieldNameInConfig"
        const field = {
            name: fieldNameInConfig,
            component: () => undefined
        }
        const columns = [
            [field],
        ]
        const someConfig = {
            [fieldNameInConfig]: "Current value of the field"
        }


        const wrapper = shallow(<ColumnPage config={someConfig} columns={columns} onChange={dummyOnChange}/>)

        expect(wrapper.find(field.component).props()).toHaveProperty('value', someConfig[fieldNameInConfig])
    })
})