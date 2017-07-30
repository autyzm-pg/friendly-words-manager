// @flow
import * as React from "react"

export type StepView = {
    component: any,
    props: any
}

export type Step = {
    name: string,
    view: StepView
}

export type ChangeHandler = (string) => () => void

export type StepPageProps = {
    onChange: ChangeHandler,
    config: *
}