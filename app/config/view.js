import {ConfigurationModel} from "./model"
import {Column, ColumnView, Section, SectionView, WizardStep, WizardView} from "../libs/confy/libs/steps"

// const DetailedListView = notImplementedFunc
// const CustomTestView = notImplementedFunc

export const ConfiguratioNWizardView = WizardView(fields => [
    WizardStep("Step 1", ColumnView([
        fields.someText
    ])),
    WizardStep("Step 2", ColumnView([
        fields.someOptionField
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