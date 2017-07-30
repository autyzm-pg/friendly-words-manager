// @flow
import React from "react"
import {View} from "native-base"
import type {ColumnType} from "./columnView"
import type {StepPageProps} from "../steps"
import {renderField} from "../../fields/fields"

const Column = ({children}) => (
    <View>
        {children}
    </View>
)

type StepColumnViewProps = {
    columns: Array<ColumnType>
} & StepPageProps

const ColumnPage = ({columns, onChange, config}: StepColumnViewProps) => (
    <View>
        {columns.map((fields, i) => (
                <Column key={i}>
                    {fields.map(renderField(config, onChange))}
                </Column>
            )
        )}
    </View>
)

export default ColumnPage