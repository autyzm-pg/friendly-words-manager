import {_handlers as handlers} from "../../redux/configurations/reducers"
import configActions from "../../redux/configurations/actionTypes"

describe("Config reducer", () => {
    it("Adds as new config", () => {
        const testedReducer = handlers[configActions.saveConfig]
        const state = {
            all: ["someOtherValue"]
        }
        const payload = {
            name: "test name",
            config: {}
        }

        const result = testedReducer(state, {payload})

        expect(result.all).toContainEqual(payload)
    })

    it("Preserves previously added configs on save", () => {
        const testedReducer = handlers[configActions.saveConfig]
        const preservedValue = "some other value"
        const state = {
            all: [preservedValue]
        }
        const payload = {
            name: "test name",
            config: {}
        }

        const result = testedReducer(state, {payload})

        expect(result.all).toContain(preservedValue)
    })
})