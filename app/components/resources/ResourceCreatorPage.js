import React from "react"

import * as R from "ramda"
import {connect} from "react-redux"
import {createWizardPage} from "../../libs/confy/views/wizard/createWizardPage"
import {Modal, onConfirm} from "../modal/Modal"
import {addResource} from "../../redux/resources/actions"
import * as constants from "../../../android/app/src/main/res/constantStrings";

import {events, logCurrentScreen, logEvent} from "../../events"


const ResourceCreatorPage = (ResourceView, resourceName) => ({history, saveResource, allNames}) => {
    const WizardPage = createWizardPage(ResourceView)

    const goBack = () => history.goBack()

    const createSave = (name, data) => {
        saveResource({...data, name})
        logEvent(events.save_word)
        goBack()
    }
    const onCreateSave = R.curry((data, name) => R.ifElse(
        R.any(R.equals(name)),
        () => Modal.ask(constants.ResourceNamed + name + constants.AlreadyExists + constants.DoYouWantToOverwriteIt, false).then(onConfirm(() => createSave(name, data))),
        () => createSave(name, data)
    )(allNames))
    logCurrentScreen("Tworzenie zasobu")
    return <WizardPage name={constants.NewResource}  onBack={goBack}
                       onSave={onCreateSave}/>
}

const dispatchToProps = (resourceName) => dispatch => ({
    saveResource: R.compose(dispatch, R.partial(addResource.start, [resourceName]))
})

const mapStateToProps = (resourceName) => ({resources}) => ({
    allNames: R.pathOr([], [resourceName, 'all'], resources).map(R.prop('name')),
})

export const EnhancedResourceCreatorPage = (resourceName, View) => connect(mapStateToProps(resourceName), dispatchToProps(resourceName))(ResourceCreatorPage(View, resourceName))