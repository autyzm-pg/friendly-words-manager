import React from "react"
import {Button, Container, Header, Icon, Tab, TabHeading, Tabs, Text, Left, Title, Body, Right} from "native-base"
import * as R from "ramda"

const renderStep = (configurationModel, activeConfig) => step => {
    const StepComponent = step.component
    return (
        <Tab key={step.name} heading={ <TabHeading><Text>{step.name}</Text></TabHeading>}>
            <StepComponent step={R.dissoc('component', step)} model={configurationModel} activeConfig={activeConfig}/>
        </Tab>
    )
}

export default WizardPage = ({steps, wizard, history}) => (
    <Container>
        <Header hasTabs>
            <Left>
                <Button transparent onPress={() => history.goBack()}>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body><Title>Nowa konfiguracja</Title></Body>
            <Right/>
        </Header>
        <Tabs>
            {
                steps.map(renderStep(wizard.model, wizard.activeConfig))
            }
        </Tabs>
    </Container>
)