import * as R from "ramda"
import {_addRecord, _createTable, _deleteRecord, _readTable, _updateRecord} from "./tables"
import Mutex from "../libs/mutex"
import {readFileAsync, writeFileAsync} from "../fileSystem/file"
import {appDataPath, appDirectory, configsDatabase, uploadAssetsDirectory} from "../fileSystem/paths";
import {injectIfDoesntExist, replaceVariables} from "../libs/asset-injector"
import * as constants from "../../android/app/src/main/res/constantStrings";

const readFile = fileName => readFileAsync(fileName)
const writeToFile = (fileName, data) => writeFileAsync(fileName, data)

const readDbFile = (fileName, defaultDb = {}) => () => readFile(fileName)
    .catch(async () => {
        await injectIfDoesntExist(appDirectory, appDataPath)
        await replaceVariables(configsDatabase, [
            ['assetsPath', `file://${uploadAssetsDirectory}`],
            ['book', constants.SampleResourceBook],
            ['pencil', constants.SampleResourcePencil],
            ['shoe', constants.SampleResourceShoe],
            ['tablet', constants.SampleResourceTablet],
            ['teddybear', constants.SampleResourceTeddybear],
            ['umbrella', constants.SampleResourceUmbrella],
            ['sample', constants.SampleConfiguration],
            ['grayedOut', constants.GrayedOut],
            ['good', constants.Good],
            ['great', constants.Great],
            ['great3', constants.ShowWhereIs + "{" + constants.Word + "}"],
            ['commandText', `${constants.ShowWhereIs}{${constants.Word}}`],
        ])
        return readFile(fileName)
    })
    .then(configsStr => JSON.parse(configsStr))
const writeDbFile = fileName => newDb => writeToFile(fileName, JSON.stringify(newDb))
const readDbFileWithLock = (mutex, readDb) => () => mutex.lock().then(readDb)
const readDbFileSafe = (mutex, readDb) => () => mutex.lock().then(readDb).then(R.tap(mutex.unlock))
const writeDbFileWithLock = (mutex, writeDb) => (newDb) => writeDb(newDb).then(R.tap(mutex.unlock))
const modifyDbFile = (readDb, writeDb) => (path, f) => readDb()
    .then(R.over(R.lensPath(path), f))
    .then(writeDb)

const createAccessors = (fileName, defaultDb) => {
    const mutex = Mutex.create()

    const readDb = readDbFile(fileName, defaultDb)
    const writeDb = writeDbFile(fileName)

    const readDbWithLock = readDbFileWithLock(mutex, readDb)
    const writeDbWithLock = writeDbFileWithLock(mutex, writeDb)

    return {
        readDb,
        writeDb,
        readDbWithLock,
        writeDbWithLock,
        readDbSafe: readDbFileSafe(mutex, readDb),
        modifyDb: modifyDbFile(readDbWithLock, writeDbWithLock)
    }
}

const DatabasesRegistry = {}

export const getDatabase = (fileName, emptyDb = {}) => {
    if (DatabasesRegistry[fileName]) {
        return DatabasesRegistry[fileName]
    }

    const defaultDatabase = {
        idSeeds: {},
        tables: {}
    }
    const newEmptyDb = R.merge(defaultDatabase, emptyDb)

    const {
        readDbWithLock,
        writeDbWithLock,
        readDbSafe,
        modifyDb
    } = createAccessors(fileName, newEmptyDb)

    const addRecord = _addRecord(readDbWithLock, writeDbWithLock)
    const updateRecord = _updateRecord(readDbWithLock, writeDbWithLock)
    const deleteRecord = _deleteRecord(readDbWithLock, writeDbWithLock)
    const readTable = _readTable(readDbSafe)
    const createTable = _createTable(readDbWithLock, writeDbWithLock)

    const db = {
        modifyDb,
        readDbSafe,
        addRecord,
        updateRecord,
        deleteRecord,
        readTable,
        createTable
    }

    DatabasesRegistry[fileName] = db

    return DatabasesRegistry[fileName]
}