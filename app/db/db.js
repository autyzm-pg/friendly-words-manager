import * as R from "ramda"
import {_addRecord, _createTable, _deleteRecord, _readTable, _updateRecord} from "./tables"
import {emptyDb} from "./format"
import Mutex from "../libs/mutex"

const dbMutex = Mutex.create()

const configsDatabase = Expo.FileSystem.documentDirectory + "db-test112.json"

const readDb = () =>  Expo.FileSystem.readAsStringAsync(configsDatabase)
    .catch(R.always(JSON.stringify(emptyDb)))
    .then(configsStr =>  JSON.parse(configsStr))
const writeDb = newDb =>  Expo.FileSystem.writeAsStringAsync(configsDatabase, JSON.stringify(newDb))

const readDbWithLock = () => dbMutex.lock().then(readDb)
const writeDbWithLock = (newDb) => writeDb(newDb).then(R.tap(dbMutex.unlock))

export const readDbSafe = () => dbMutex.lock().then(readDb).then(R.tap(dbMutex.unlock))

export const modifyDb = (path, f) => readDbWithLock()
    .then(R.over(R.lensPath(path), f))
    .then(writeDbWithLock)

export const addRecord = _addRecord(readDbWithLock, writeDbWithLock)
export const updateRecord = _updateRecord(readDbWithLock, writeDbWithLock)
export const deleteRecord = _deleteRecord(readDbWithLock, writeDbWithLock)
export const readTable = _readTable(readDbSafe)
export const createTable = _createTable(readDbWithLock, writeDbWithLock)

export const createTableForModel = model => createTable(model.name)