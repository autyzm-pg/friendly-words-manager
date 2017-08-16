import * as R from "ramda"

const removeConfigFromList = name => R.filter(config => config.name !== name)
const addConfigToList = (name, config) => R.append({
    name,
    config
})

const emptyDb = {
    tables: {
        configs: []
    },
    activeConfig: undefined
}

const configsDatabase = Expo.FileSystem.documentDirectory + "db-test.json"

const readDb = () => Expo.FileSystem.readAsStringAsync(configsDatabase)
    .catch(R.always(JSON.stringify(emptyDb)))
    .then(configsStr => JSON.parse(configsStr))
const writeDb = newDb => Expo.FileSystem.writeAsStringAsync(configsDatabase, JSON.stringify(newDb))

const modifyDb = (path, f) => readDb()
    .then(R.over(R.lensPath(path), f))
    .then(writeDb)

export const readConfigs = () => readDb().then(R.path(['tables', 'configs']))

export const changeActiveConfig = newActiveConfig => modifyDb(
    ['activeConfig'],
    R.always(newActiveConfig)
)
export const readActiveConfig = () => readDb().then(R.prop('activeConfig'))

export const addConfig = (newConfig) => modifyDb(
    ['tables', 'configs'],
    R.compose(
        addConfigToList(newConfig.name, newConfig.config),
        removeConfigFromList(newConfig.name),
    )
)