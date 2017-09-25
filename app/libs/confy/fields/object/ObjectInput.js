import React from "react"
import {Button, List, ListItem, Text, View} from "native-base"
import * as R from "ramda"
import {withLog} from "../../libs/debug"

const setForPath = (path, obj, value) => R.set(R.lensPath(path), value, obj)

export const ObjectListInput = withLog(({verbose, value, onChange, fields, config, path, hiddenFields}) => (
    <View>
        <Text>{verbose}</Text>
        <List>
            {R.values(R.omit(hiddenFields, fields)).map(field => (
                <ListItem key={field.name}>
                    <View>
                        {field.renderField(
                            value[field.name],
                            newElementValue => onChange(setForPath([field.name], value, newElementValue)),
                            config,
                            [...path, field.name]
                        )}
                    </View>
                </ListItem>
            ))}
        </List>
    </View>
))