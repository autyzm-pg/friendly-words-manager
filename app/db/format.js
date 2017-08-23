export const ModeTypes = {
    learning: 0,
    test: 1
}
export const emptyDb = {
    idSeeds: {
        configs: 1000
    },
    tables: {
        configs: []
    },
    activeConfig: {
        name: undefined,
        mode: ModeTypes.learning
    }
}