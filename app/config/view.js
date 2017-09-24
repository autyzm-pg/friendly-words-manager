// @flow
import {ConfigurationModel, WordModel} from "./model"
import {WizardStep, WizardView} from "../libs/confy/views/wizard/wizardView"
import {Column, ColumnView} from "../libs/confy/views/column/columnView"
import {Section, SectionView} from "../libs/confy/views/section/sectionView"

// const DetailedListView = notImplementedFunc
// const CustomTestView = notImplementedFunc

export const WordsWizardView = WizardView(fields => [
	WizardStep("Test", ColumnView([
		Column([fields.images, fields.tags])
	]))
], WordModel)

export const ConfigurationWizardView = WizardView(fields => [
    WizardStep("Materiał", ColumnView([
        Column([fields.materials, fields.wordImages])
    ])),
    WizardStep("Sposób uczenia", SectionView([
        Section("Ustawienia kroku", [fields.commandText, fields.picturesNumber, fields.showPicturesLabels, fields.readCommand]),
	    Section("Ustawienia próby", [fields.repetitionsNumber]),
	    Section("Ustawienia podpowiedzi", [fields.repetitionsNumber])

    ])),
	WizardStep("Wzmocnienia", ColumnView([
		Column([fields.someOptionField])
	])),
	WizardStep("Test", ColumnView([
		Column([fields.someOptionField])
	]))
], ConfigurationModel)

// export const ConfigurationWizardView = WizardView(fields => [
//     WizardStep("Material", DetailedListView(fields.materials)),
//     WizardStep("Sposob Uczenia", SectionView([
//             Section("Ustawienia kroku", [
//                 fields.commandText,
//                 fields.picturesNumber,
//                 fields.isTextForPicture,
//                 fields.isReadingCommands
//             ]),
//             Section("Ustawienia proby", [
//                 fields.numberOfRepetitions
//             ]),
//             Section("Ustawienia podpowiedzi", [
//                 fields.hintType,
//                 fields.showHintAfter
//             ])
//         ])
//     ),
//     WizardStep("Wzmocnienia", ColumnView([
//         Column([
//             fields.textRewards,
//             fields.isReadingRewards
//         ]),
//         Column([
//             fields.animationRewards
//         ])
//     ])),
//     WizardStep("Test", CustomTestView([
//         fields.testConfig.fields.numberOfRepetitions,
//         fields.testConfig.fields.timeForAnswer
//     ]))
// ], ConfigurationModel)