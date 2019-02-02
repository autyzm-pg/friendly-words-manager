// @flow
import React from "react"
import {View} from "native-base"
import type {ColumnType} from "./columnView"
import type {StepPageProps} from "../steps"
import styles from "./styles"
import {ScrollView} from "react-native"
import firebase from "react-native-firebase";
import {events} from "../../../../components/firebase/Events";

const Column = ({children, style}) => (
    <View style={[styles.columnContainer, style]}>
        <View style={{maxWidth:500, flex:1}}>
            <ScrollView style={styles.column}>
                {children}
            </ScrollView>
        </View>
    </View>
)

type StepColumnViewProps = {
    columns: Array<ColumnType>
} & StepPageProps

const ColumnPage = ({columns, renderField, config}: StepColumnViewProps) => {
    firebase.analytics().logEvent(events.change_tab_strengthen)
    return (<View style={styles.columnsContainer}>
        {columns.map((fields, i) => (
                <Column key={i} style={i % 2 ? styles.oddColumn : styles.evenColumn}>
                    {fields.map(renderField)}
                </Column>
            )
        )}
    </View>)
}

export default ColumnPage