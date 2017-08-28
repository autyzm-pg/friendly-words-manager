// @flow
import React from "react"
import {View} from "native-base";
import {FieldProps} from "../fields";
import {MultiChooser, ImageOption} from "../../components/ui/MultiChooser";

type ImageMultiChooserProps = {
	options: Array<string>
} & FieldProps<Array<string>>

export const ImageMultiChooser = ({verbose, value, onChange, options}: ImageMultiChooserProps) =>
	<View>
		<MultiChooser value={value} onChange={onChange}>
			{options.map(option => <ImageOption key={option} src={option} value={option}/>)}
		</MultiChooser>
	</View>