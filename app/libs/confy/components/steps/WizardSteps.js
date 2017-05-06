import React from "react"
import {Content, List, ListItem, Right, TabHeading, Tabs, Tab, Text, View} from "native-base"
import * as R from "ramda"

export const WizardStepsContainer = ({children, configurationModel, activeConfig}) => (
    <Tabs>
        {
            React.Children.map(children, child => child.type({configurationModel, activeConfig, ...child.props}))
        }
    </Tabs>
)

export const WizardStep = ({configurationModel, activeConfig, step, key}) => {
    const StepComponent = step.component
    return (
        <Tab key={key} heading={ <TabHeading><Text>{step.name}</Text></TabHeading>}>
            <StepComponent step={R.dissoc('component', step)} model={configurationModel} activeConfig={activeConfig}/>
        </Tab>
    )
}

