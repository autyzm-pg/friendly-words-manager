import React from "react"
import {Form, Text, View} from "native-base"
import {Switch} from "react-native"

const styles = {
	"wrapper": {flex: 1, flexDirection: "row", justifyContent: "space-between"}
}

const SwitchInput = ({verbose, value, onChange}) => (
	<Form>
		<Text>{verbose}</Text>
		<Switch value={value} onValueChange={onChange} />
	</Form>
)
export default SwitchInput