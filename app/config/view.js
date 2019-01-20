// @flow
import {ConfigurationModel, WordModel} from "./model"
import {WizardSingleView, WizardStep, WizardView} from "../libs/confy/views/wizard/wizardView"
import {Column, ColumnView} from "../libs/confy/views/column/columnView"
import {Section, SectionView} from "../libs/confy/views/section/sectionView"
import {SingleView} from "../libs/confy/views/single/singleView"
import {ListView} from "../libs/confy/views/list/listView"
import * as constants from "../../android/app/src/main/res/constantStrings";

// const DetailedListView = notImplementedFunc
// const CustomTestView = notImplementedFunc

export const WordsWizardView = WizardSingleView(fields =>
    ListView([fields.images]),
    WordModel
)

export const ConfigurationWizardView = WizardView(fields => [
    WizardStep(constants.Material, SingleView(fields.materials)),
    WizardStep(constants.LearningMethod, SectionView([
        Section(constants.StepSettings, [fields.commandText, fields.picturesNumber, fields.showPicturesLabels, fields.isReadingCommands]),
        Section(constants.SampleSettings, [fields.numberOfRepetitions]),
        Section(constants.HintsSettings, [fields.showHintAfter])

    ])),
    WizardStep(constants.Rewards, ColumnView([
        Column([
            fields.textRewards,
            fields.isReadingRewards
        ]),
        // No animation implemented
        // Column([
        //     fields.animationRewards
        // ])
    ])),
    WizardStep(constants.Test, SingleView(fields.testConfig))
], ConfigurationModel)
