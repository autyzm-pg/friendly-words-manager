import * as R from "ramda"

const removeConfigFromList = name => R.filter(config => config.name !== name)
const addConfigToList = (name, config) => R.append({
    name,
    config
})

export const ModeTypes = {
    learning: 0,
    test: 1
}

const emptyDb = {
    tables: {
        configs: []
    },
    activeConfig: {
        name: undefined,
        mode: ModeTypes.learning
    }
}

const configsDatabase = Expo.FileSystem.documentDirectory + "db-test2.json"

const readDb = () => Expo.FileSystem.readAsStringAsync(configsDatabase)
    .catch(R.always(JSON.stringify(emptyDb)))
    .then(configsStr => JSON.parse(configsStr))
const writeDb = newDb => Expo.FileSystem.writeAsStringAsync(configsDatabase, JSON.stringify(newDb))

const modifyDb = (path, f) => readDb()
    .then(R.over(R.lensPath(path), f))
    .then(writeDb)

export const readConfigs = () => readDb().then(R.path(['tables', 'configs'])).then(R.filter(({name}) => !!name))

export const changeActiveConfig = (newActiveConfig, mode) => modifyDb(
    ['activeConfig'],
    R.always({name: newActiveConfig, mode})
)
export const readActiveConfig = () => readDb().then(R.prop('activeConfig'))

export const addConfig = (newConfig) => modifyDb(
    ['tables', 'configs'],
    R.compose(
        addConfigToList(newConfig.name, newConfig.config),
        removeConfigFromList(newConfig.name),
    )
)

export const deleteConfig = configName => modifyDb(
    ['tables', 'configs'],
    removeConfigFromList(configName)
)