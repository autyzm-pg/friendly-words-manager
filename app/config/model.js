// @flow
import {DBModel, MainModel} from "../libs/confy/models"
import {OptionField} from "../libs/confy/fields/options/optionField"
import {TextField} from "../libs/confy/fields/text/textField"
import {BoolField} from "../libs/confy/fields/switch/boolField"
import {ImageMultiChooserField, MultiChooserField} from "../libs/confy/fields/multiOptions/multiOptionField"
import {ObjectField} from "../libs/confy/fields/object/ObjectField"
import * as R from "ramda"
import {ImagePickerField} from "../libs/confy/fields/imagePicker/ImagePickerField"
import {IntegerField} from "../libs/confy/fields/integer/IntegerField"
import {MaterialsArrayField, MaterialsArrayInput} from "../pages/confyViews/materials/MaterialsField"
import {ForeignField} from "../libs/confy/fields/foreign/foreignField"
import {SimpleCheckbox} from "../pages/confyViews/materials/SimpleCheckbox"
import {get, getChildProp, getSiblingProp} from "../libs/confy/fields/dynamic/traversing"
import TestObjectInput from "../pages/confyViews/testObjectPage/TestObjectInput"

export const WordModel = DBModel("words", {
    name: TextField("Slowo"),
    tags: TextField("Kategorie"),
    images: ImagePickerField("Obrazy")
})

export const ConfigurationModel = MainModel({
    materials: MaterialsArrayField({
        word: ForeignField("Wybrane słowo", WordModel),
        isInLearningMode: BoolField("W uczeniu", {component: SimpleCheckbox, def: true}),
        isInTestMode: BoolField("W teście", {component: SimpleCheckbox, def: true}),
        images: ImageMultiChooserField("Wybierz materiały wizualne", undefined, (obj, path) => ({
                options: R.pipe(
                    getSiblingProp("word"),
                    getChildProp("images"),
                    get
                )(path)(obj)
            })
        )
    }),
    hintType: MultiChooserField("Rodzaj podpowiedzi", {
        options: [
            "Wyszarz",
            "Powieksz",
            "Brak"
        ],
        def: [
            "Wyszarz"
        ]
    }),
    commandText: OptionField("Rodzaj polecenia", {
        options: [
            "Pokaż gdzie jest {slowo}",
            "{slowo}",
        ]
    }),
    picturesNumber: IntegerField("Ilość obrazków", {min: 1, max: 6, def: 3}),
    showPicturesLabels: BoolField("Pokazuj podpisy pod obrazkami", {def: true}),
    isReadingCommands: BoolField("Czytanie poleceń", {def: true}),
    showHintAfter: IntegerField("Czas do pokazania podpowiedzi", {min: 1, max: 20, def: 5, units: "s"}),
    numberOfRepetitions: IntegerField("Ilość powtórzeń", {min: 1, max: 20, def: 3}),
    textRewards: MultiChooserField("Wybierz pochwały słowne", {
        options: [
            "Super",
            "ŚWIETNIE",
            "Dobrze"
        ],
        def: [
            "ŚWIETNIE",
            "Dobrze"
        ]
    }),
    isReadingRewards: BoolField("Odczytywanie głosowe wzmocnień"),
    animationRewards: ImageMultiChooserField("Wybierz animowane motywy nagród", {
        options: [
            {uri: "http://via.placeholder.com/350x350"},
            {uri: "http://via.placeholder.com/350x351"},
            {uri: "http://via.placeholder.com/351x350"}
        ]
    }),
    testConfig: ObjectField("Konfiguracja test", {
        numberOfRepetitions: IntegerField("Ilość powtórzeń", {min: 1, max: 20, def: 3}),
        timeForAnswer: IntegerField("Czas na odpowiedź", {min: 1, max: 10, def: 5, units: "s"})
    }, undefined, TestObjectInput)
})
