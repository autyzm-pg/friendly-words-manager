import React from "react"
import {Button, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"

const setForPath = (path, obj, value) => R.set(R.lensPath(path), value, obj)

export const ObjectListInput = ({verbose, value, onChange, fields}) => (
    <View>
        <Text>{verbose}</Text>
        <List>
            {R.values(fields).map(field => (
                <ListItem key={field.name}>
                    <View>
                        {field.renderField(
                            value[field.name],
                            newElementValue => onChange(setForPath([field.name], value, newElementValue))
                        )}
                    </View>
                </ListItem>
            ))}
        </List>
    </View>
)