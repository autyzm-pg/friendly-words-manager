import React from "react"
import {Content, List, ListItem, Right, TabHeading, Text, View} from "native-base"
import Tab from "native-base/src/theme/components/Tab"

export default StepView = ({step, model, activeConfig}) => (
    <View>
        <List>
            {
                step.fields.map(field => (
                    <ListItem key={field}>
                        <View>
                            <Text>{model[field].verbose}</Text>
                            <Right>
                                <Text>{activeConfig[field]}</Text>
                            </Right>
                        </View>
                    </ListItem>
                ))
            }

        </List>
    </View>
)