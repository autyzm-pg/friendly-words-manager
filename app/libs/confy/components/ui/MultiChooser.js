import React from "react"
import {
	CheckBox
} from 'native-base'
import {View, Text, Image, TouchableOpacity} from "react-native"
import R from "ramda"

export const MultiChooser = ({value, onChange, children, style}) => {

	const onChangeHandler = (changedVal) => {
		const newValue = value.includes(changedVal)
			? R.without(changedVal, value)
			: R.append(changedVal, value);
		onChange(newValue);
	};

	return (
		<View style={style}>
			{React.Children.map(children, child =>
					React.cloneElement(child, {
						isChecked: value.includes(child.props.value),
						onPress: () => onChangeHandler(child.props.value)
					})
			)}
		</View>
	);
};

export const Option = ({isChecked, onPress, label, checkboxStyle, style }) => {
	label = R.is(String, label) ? <Text>{label}</Text> : label;
	return <TouchableOpacity style={style} onPress={onPress}>
		<CheckBox style={checkboxStyle} checked={isChecked} />
		{label}
	</TouchableOpacity>
};

export const ImageOption = ({src, size, ...rest}) => {
	const {isChecked} = rest;
	const label = <Image source={{uri: src}} style={[{width: size, height: size}, isChecked && {transform: [{scale: 0.8}]}]}/>

	return <Option {...rest} label={label} />
};

export const ColorOption = ({hex, ...rest}) => {
	const label = <View style={{backgroundColor: hex, height: 50, width: 50, borderRadius: 100}} />;
	return <Option {...rest} label={label} />
};
