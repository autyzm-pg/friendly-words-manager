import React from "react"
import {connect} from "react-redux"
import {withLog} from "../libs/confy/libs/debug"
import * as R from "ramda"
import {editConfig} from "../redux/configurations/actions"
import {createWizardPage} from "../libs/confy/views/wizard/WizardPage"
import {ConfigurationWizardView} from "../config/view"
import {goBack} from "./CreatorPage"
import {Modal, onSuccess} from "../components/modal/Modal"

const editSave = (history, handler, previousName, name, config) => {
    handler({previousName, name, config})
    history.push('/configurations')
}
const isNameCollision = (name, previousName, allNames) => previousName !== name && R.any(R.equals(name), allNames)
const onEditSave = R.curry((previousName, allConfigNames, handler, history, config, name) => {
    if(isNameCollision(name, previousName, allConfigNames)) {
        return Modal.ask(`Krok o nazwie '${name}' ju? istnieje. Czy napewno chcesz go nadpisa??`, false).then(onSuccess(() => editSave(history, handler, previousName, name, config)))
    }
    editSave(history, handler, previousName, name, config)
})
const _EditPage = ({history, editConfig, name, config, allConfigNames}) => {
    const EditWizardPage = createWizardPage(ConfigurationWizardView, config)

    return <EditWizardPage name={name} onBack={goBack(history)} onSave={onEditSave(name, allConfigNames, editConfig, history)}/>
}
const dispatchToProps = dispatch => ({
    editConfig: R.compose(dispatch, editConfig.start)
})
const mapStateToProps = ({configurations}, {match}) => ({
    name: match.params.name,
    allConfigs: configurations.all,
    allConfigNames: configurations.all.map(R.prop('name')),
    config: configurations.all.find(R.o(R.equals(match.params.name), R.prop('name'))).config
})
export const EditPage = connect(withLog(mapStateToProps), dispatchToProps)(_EditPage)