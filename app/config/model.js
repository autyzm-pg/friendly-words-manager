import {Model} from "../libs/confy/models"
import {OptionField} from "../libs/confy/fields/options/optionField"
import {TextField} from "../libs/confy/fields/text/textField"

// export const WordModel = Model({
//     name: TextField(),
//     images: ArrayField(UriField()),
//     tags: ArrayField(TextField())
// })

export const ConfigurationModel = Model({
    someText: TextField("Some text"),
    someOptionField: OptionField("Some option", {
        options: [
            "option1",
            "option2"
        ]

    })
})

// export const ConfigurationModel = Model({
//     materials: ArrayField(ObjectField({
//         word: ForeignField(WordModel, Select({
//             name: TextField({readonly: true}),
//             images: MultiOptionField()
//         })),
//         isInLearningMode: BoolField(),
//         isInTestingMode: BoolField()
//     })),
//     hintType: OptionField([
//         "Wyszarz",
//         "TAK",
//         "Powieksz",
//         "Brak"
//     ]),
//     commandText: OptionField([
//         "Pokaz gdzie jest {slowo}",
//         "{slowo}",
//     ]),
//     picturesNumber: IntegerField(1, 6),
//     isTextForPicture: BoolField(),
//     isReadingCommands: BoolField(),
//     showHintAfter: IntegerField(1, 20),
//     numberOfRepetitions: IntegerField(1, 20),
//     textRewards: MultiOptionField([
//         "Super",
//         "TAK",
//         "SWIETNIE"
//     ]),
//     isReadingRewards: BoolField(),
//     animationRewards: MultiImageOptionField([
//         "image/path"
//     ]),
//     testConfig: ObjectField({
//         numberOfRepetitions: IntegerField(1, 20),
//         timeForAnswer: IntegerField(1, 10)
//     })
// })

// const LinesConfigurationModel = Model({
//     materials: ArrayField(ObjectField({
//         shape: OptionField([
//             'Linia prosta',
//             'Linia ukosna',
//             'Kolo'
//         ]),
//         shapeColor: MultiColorField(colors),
//         trailColor: MultiColorField(colors),
//         size: MultiSizeField(sizes)
//     })),
//     materialRepets: IntegerField(1, 20),
//     isStartingPoint: BoolField(),
//     textRewards: MultiOptionField([
//         "Super",
//         "TAK",
//         "SWIETNIE"
//     ]),
//     isReadingRewards: BoolField(),
//     animationRewards: MultiImageOptionField([
//         "image/path"
//     ]),
//     testMaterialRepeats: IntegerField(1,20)
// })