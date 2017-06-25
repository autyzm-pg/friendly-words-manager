import React from "react"
import {
	CheckBox
} from 'native-base'
import {View, Text} from "react-native"
import R from "ramda"

export const MultiChooser = ({value, onChange, children}) => {

	const onChangeHandler = (val) => {
		const newValue = value.includes(val)
			? R.without(val, value)
			: R.append(val, value);
		onChange(newValue);
	};

	return (
		<View>
			{React.Children.map(children, child =>
					React.cloneElement(child, {
						isChecked: value.includes(child.props.value),
						onPress: () => onChangeHandler(child.props.value)
					})
			)}
		</View>
	);
};

export const Option = ({label, isChecked, onPress }) => (
	<View>
		<CheckBox checked={isChecked} onPress={onPress} />
		<Text>{label}</Text>
	</View>
);
