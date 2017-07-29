import {BaseFieldType} from "../../libs/fields";
import {StepView} from "../steps";

export type ColumnType = Array<BaseFieldType>
export const Column = (fields: Array<BaseFieldType>) => fields

type ColumnViewFactory = (columns: Array<ColumnType>) => StepView
export const ColumnView: ColumnViewFactory = columns => ({
    component: StepColumnView,
    props: {
        columns,
    }
})