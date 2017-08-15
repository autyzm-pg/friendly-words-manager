import * as R from "ramda"

const configsDatabase = Expo.FileSystem.documentDirectory + "configs.json"

export const readConfigsDatabase = () => Expo.FileSystem.readAsStringAsync(configsDatabase)
    .catch(R.always("[]"))
    .then(configsStr => JSON.parse(configsStr))

export const addConfigDatabase = (newConfig) => readConfigsDatabase()
    .then(current => [...current, newConfig])
    .then(newDb => JSON.stringify(newDb))
    .then(newDbStr => Expo.FileSystem.writeAsStringAsync(configsDatabase, newDbStr))