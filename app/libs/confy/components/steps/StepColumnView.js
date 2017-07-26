// @flow
import React from "react"
import {View} from "native-base"
import type {ColumnType} from "../../libs/steps"


const ColumnView = ({children}) => (
    <View>
        {children}
    </View>
)

type StepColumnViewProps = {
    columns: Array<ColumnType>,
    onChange: () => void
}

const StepColumnView = ({columns, onChange}: StepColumnViewProps) => (
    <View>
        {columns.map((fields, i) => (
                <ColumnView key={i}>
                    {fields.map(Field => <Field.component key={Field.name} onChange={onChange} {...Field.props}/>)}
                </ColumnView>
            )
        )}
    </View>
)

export default StepColumnView