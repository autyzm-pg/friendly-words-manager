import React from "react"
import {Button, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"

const setForPath = (path, array, value) => R.set(R.lensPath(path), value, array)

export default ArrayInput = ({verbose, value, onChange, field}) => (
    <View>
        <Text>{verbose}</Text>
        <List>
            {value.map((elementValue, index) => (
                <ListItem key={index}>
                    <View>
                        {field.renderField(
                            elementValue,
                            newElementValue => onChange(setForPath([index], value, newElementValue))
                        )}
                    </View>
                    <View>
                        <Button onPress={() => onChange(R.remove(index, 1, value))}>
                            <Text>Usuń</Text>
                        </Button>
                    </View>
                </ListItem>
            ))}
        </List>
        <View>
            <Button onPress={() => onChange([...value, field.getDefaultValue()])}>
                <Text>Dodaj element</Text>
            </Button>
        </View>
    </View>
)