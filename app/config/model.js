import {
    BoolField, getDefaultModel, ImageChecklistField, ModelListField, OptionField,
    TextField
} from "../libs/confy/libs/fields"
import {FullStep, Step} from "../libs/confy/libs/steps"

const timeLimitOptions = ["1s", "2s", "3s", "4s"]
const colors = ['Niebieski', "Czerwony"]
const shapes = ['Linia pozioma', 'Linia pionowa']
const shapeWidths = [1, 2, 3]
const animationThemeOptions = ['image1', 'image2']

const stepModel = {
    shapeColor: OptionField({options: colors, verbose: "Kolor sladu"}),
    lineColor: OptionField({options: colors, verbose: "Kolor ksztaltu"}),
    shapeType: OptionField({options: shapes, verbose: "Rodzaj ksztaltu"}),
    shapeWidth: OptionField({options: shapeWidths, verbose: "Szerokosc sladu"})
}

const defaultSteps = [
    getDefaultModel(stepModel)
]

export const configurationModel = {
    timeLimit: OptionField({options: timeLimitOptions, verbose: "Limit czasu"}),
    showStartingPoint: BoolField({verbose: "Pokaz punkt startu"}),
    animationThemes: ImageChecklistField({verbose: "Motywy animacji", options: animationThemeOptions}),
    steps: ModelListField({model: stepModel, def: defaultSteps})
}

export const Steps = [
    Step("Ogolne", [
        'timeLimit',
        'showStartingPoint',
        'animationThemes'
    ]),
    FullStep('Rozgrywka', 'steps')
]