import React from "react"
import {Button, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"
import * as constants from "../../../../../android/app/src/main/res/constantStrings";
import {fontStyles} from "../../../../../android/app/src/main/res/fontStyle";

export const setForPath = (path, array, value) => R.set(R.lensPath(path), value, array)

export default ArrayInput = ({verbose, value, onChange, field, config, path}) => (
    <View>
        <Text>{verbose}</Text>
        <List>
            {value.map((elementValue, index) => (
                <ListItem key={index}>
                    <View>
                        {field.renderField(
                            elementValue,
                            newElementValue => onChange(setForPath([index], value, newElementValue)),
                            config,
                            [...path, index]
                        )}
                    </View>
                    <View>
                        <Button onPress={() => onChange(R.remove(index, 1, value))}>
                            <Text style={fontStyles.delete}>{constants.Delete}</Text>
                        </Button>
                    </View>
                </ListItem>
            ))}
        </List>
        <View>
            <Button onPress={() => onChange([...value, field.getDefaultValue()])}>
                <Text>{constants.AddElement}</Text>
            </Button>
        </View>
    </View>
)