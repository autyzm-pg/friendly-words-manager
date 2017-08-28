import React from "react"
import {
	CheckBox
} from 'native-base'
import {View, Text, Image} from "react-native"
import R from "ramda"

export const MultiChooser = ({value, onChange, children}) => {

	const onChangeHandler = (changedVal) => {
		const newValue = value.includes(changedVal)
			? R.without(changedVal, value)
			: R.append(changedVal, value);
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

export const Option = ({isChecked, onPress, label }) => {
	label = R.is(String, label) ? <Text>{label}</Text> : label;
	return <View>
		<CheckBox checked={isChecked} onPress={onPress}/>
		{label}
	</View>
};

export const ImageOption = ({src, ...rest}) => {
/*
	const label = <Image source={{uri: src}} style={{width: 50, height: 50}}/>;
*/
	const label = <Text>{src}</Text>;
	return <Option {...rest} label={label} />
};


export const ColorOption = ({hex, ...rest}) => {
	const label = <View style={{backgroundColor: hex, height: 50, width: 50, borderRadius: 100}} />;
	return <Option {...rest} label={label} />
};
