import React from "react"
import { List, ListItem, Right, Text, View} from "native-base"

export default StepListView = ({step, model, activeConfig}) => (
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