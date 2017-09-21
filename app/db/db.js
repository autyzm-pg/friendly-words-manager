import * as R from "ramda"
import {_addRecord, _createTable, _deleteRecord, _readTable, _updateRecord} from "./tables"
import {emptyDb} from "./format"

const configsDatabase = Expo.FileSystem.documentDirectory + "db-test8.json"

export const readDb = () => Expo.FileSystem.readAsStringAsync(configsDatabase)
    .catch(R.always(JSON.stringify(emptyDb)))
    .then(configsStr => JSON.parse(configsStr))
export const writeDb = newDb => Expo.FileSystem.writeAsStringAsync(configsDatabase, JSON.stringify(newDb))

export const modifyDb = (path, f) => readDb()
    .then(R.over(R.lensPath(path), f))
    .then(writeDb)

export const addRecord = _addRecord(readDb, writeDb)
export const updateRecord = _updateRecord(readDb, writeDb)
export const deleteRecord = _deleteRecord(readDb, writeDb)
export const readTable = _readTable(readDb)
export const createTable = _createTable(readDb, writeDb)

export const createTableForModel = model => createTable(model.name)