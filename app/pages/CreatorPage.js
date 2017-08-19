import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"

import {ConfigurationWizardView} from "../config/view"
import * as R from "ramda"
import {connect} from "react-redux"
import {saveConfig, editConfig} from "../redux/configurations/actions"
import {withLog} from "../libs/confy/libs/debug"
import {Modal, onSuccess} from "../components/modal/Modal"

const createSave = (history, handler, name, config) => {
    handler(name, config)
    history.push("/configurations")
}
const onCreateSave = R.curry((allConfigNames, handler, history, config, name) => R.ifElse(
    R.any(R.equals(name)),
    () => Modal.ask(`Krok o nazwie '${name}' już istnieje. Czy napewno chcesz go nadpisać?`, false).then(onSuccess(() => createSave(history, handler, name, config))),
    () => createSave(history, handler, name, config)
)(allConfigNames))

const editSave = (history, handler, previousName, name, config) => {
    handler({previousName, name, config})
    history.push('/configurations')
}
const isNameCollision = (name, previousName, allNames) => previousName !== name && R.any(R.equals(name), allNames)
const onEditSave = R.curry((previousName, allConfigNames, handler, history, config, name) => {
    if(isNameCollision(name, previousName, allConfigNames)) {
        return Modal.ask(`Krok o nazwie '${name}' już istnieje. Czy napewno chcesz go nadpisać?`, false).then(onSuccess(() => editSave(history, handler, previousName, name, config)))
    }
    editSave(history, handler, previousName, name, config)
})

const WizardPage = createWizardPage(ConfigurationWizardView)

const goBack = (history) => () => history.push("/configurations")

const CreatorPage = ({history, saveConfig, allConfigNames}) => (
    <WizardPage name="Nowa konfiguracja" onBack={goBack(history)}
                onSave={onCreateSave(allConfigNames, saveConfig, history)}/>
)

const _EditPage = ({history, editConfig, name, config, allConfigNames}) => {
    const EditWizardPage = createWizardPage(ConfigurationWizardView, config)

    return <EditWizardPage name={name} onBack={goBack(history)} onSave={onEditSave(name, allConfigNames, editConfig, history)}/>
}

const dispatchToPropsForCreate = dispatch => ({
    saveConfig: R.compose(dispatch, saveConfig)
})

const dispatchToPropsForEdit = dispatch => ({
    editConfig: R.compose(dispatch, editConfig.start)
})


const mapStateToPropsForCreate = ({configurations}) => ({
    allConfigNames: configurations.all.map(R.prop('name')),
})

const mapStateToPropsForEdit = ({configurations}, {match}) => ({
    name: match.params.name,
    allConfigs: configurations.all,
    allConfigNames: configurations.all.map(R.prop('name')),
    config: configurations.all.find(R.o(R.equals(match.params.name), R.prop('name'))).config
})

export default connect(mapStateToPropsForCreate, dispatchToPropsForCreate)(CreatorPage)

export const EditPage = connect(withLog(mapStateToPropsForEdit), dispatchToPropsForEdit)(_EditPage)