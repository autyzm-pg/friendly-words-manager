// @flow
import React from "react"
import {View} from "native-base"
import type {ColumnType} from "./columnView"
import type {StepPageProps} from "../steps"
import {withLog} from "../../libs/debug"

const Column = ({children}) => (
    <View>
        {children}
    </View>
)

type StepColumnViewProps = {
    columns: Array<ColumnType>
} & StepPageProps

const ColumnPage = ({columns, renderField, config}: StepColumnViewProps) => (
    <View>
        {columns.map((fields, i) => (
                <Column key={i}>
                    {fields.map(renderField)}
                </Column>
            )
        )}
    </View>
)

export default withLog(ColumnPage)