// @flow
import React from "react"
import {View} from "native-base";
import {FieldProps} from "../fields";
import {StyleSheet} from "react-native";
import {MultiOptions, ImageOption} from "../../components/ui/MultiOptions";

type ImageMultiChooserProps = {
	options: Array<string>
} & FieldProps<Array<string>>

export const ImageMultiChooser = ({verbose, value, onChange, options}: ImageMultiChooserProps) =>
	<View>
		<MultiOptions style={styles.container} value={value} onChange={onChange}>
			{options.map(option => <ImageOption style={styles.imageOption} size={150} key={option}
			                                    src={option} value={option} checkboxStyle={styles.checkbox}/>)}
		</MultiOptions>
	</View>;


const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap"
	},

	imageOption: {
		backgroundColor: "#eee",
		margin: 12,
		padding: 1,
	},

	checkbox: {
		position: "absolute",
		zIndex: 1,
		top: 8,
	}
});