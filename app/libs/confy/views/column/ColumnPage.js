// @flow
import React from "react"
import {View} from "native-base"
import type {ColumnType} from "./columnView"

const Column = ({children}) => (
    <View>
        {children}
    </View>
)

type StepColumnViewProps = {
    columns: Array<ColumnType>,
    onChange: () => void
}

const ColumnPage = ({columns, onChange}: StepColumnViewProps) => (
    <View>
        {columns.map((fields, i) => (
                <Column key={i}>
                    {fields.map(Field => <Field.component key={Field.name} onChange={onChange} {...Field.props}/>)}
                </Column>
            )
        )}
    </View>
)

export default ColumnPage