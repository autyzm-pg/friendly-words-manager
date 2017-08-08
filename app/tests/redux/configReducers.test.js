import {_handlers as handlers} from "../../redux/configurations/reducers"
import configActions from "../../redux/configurations/actionTypes"

describe("Config reducer", () => {
    it("Adds as new config", () => {
        const testedReducer = handlers[configActions.saveConfig]
        const state = {
            all: []
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
            all: [{
                name: preservedValue
            }]
        }
        const payload = {
            name: "test name",
            config: {}
        }

        const result = testedReducer(state, {payload})

        expect(result.all).toContainEqual({
            name: preservedValue
        })
    })

    it("Overrides config with the same name", () => {
        const testedReducer = handlers[configActions.saveConfig]
        const overridenName = "some config name"
        const newConfig = "some new config"

        const state = {
            all: [
                {
                    name: overridenName,
                    config: "old config"
                },
                {
                    name: "should be preserved",
                    config: {}
                },
            ]
        }
        const payload = {
            name: overridenName,
            config: "new config"
        }

        const result = testedReducer(state, {payload})

        expect(result.all.filter(config => config.name === overridenName)).toContainEqual(payload)
    })
})