import {ConfigurationModel} from "./model"
import {WizardStep, WizardView} from "../libs/confy/views/wizard/wizardView"
import {Column, ColumnView} from "../libs/confy/views/column/columnView"

// const DetailedListView = notImplementedFunc
// const CustomTestView = notImplementedFunc

export const ConfigurationWizardView = WizardView(fields => [
    WizardStep("Step 1", ColumnView([
        Column([fields.someText])
    ])),
    WizardStep("Step 2", ColumnView([
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