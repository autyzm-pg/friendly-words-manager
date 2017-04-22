import React from "react"

import {
    Container,
    Fab,
    Content,
    Header,
    Body,
    Title,
    Button,
    Text,
    Tab,
    Tabs,
    TabHeading,
    Icon,
    Left,
    Right,
    List,
    ListItem
} from 'native-base'
import {ConfigElem} from "../components/configurations/ConfigList"
import ConfigList from "../components/configurations/ConfigList"


const testList = [
    "Konfiguracja 1",
    "Konfiguracja 3",
    "Konfiguracja 20",
    "Janek",
    "Maciej Paciej",

    "Jasiu Stasiu"
]

export default ConfigurationsPage = ({history, configurations = testList}) =>
    <Container>
        <Header>
            <Left>
                <Button transparent onPress={() => history.goBack()}>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body>
            <Title>Konfiguracje</Title>
            </Body>
            <Right/>
        </Header>

        <Content>
            <ConfigList>
                {configurations.map(config => (
                    <ConfigElem key= {config} item={config}/>
                ))}
            </ConfigList>

        </Content>

        <Fab onPress={() => console.log("ADD CONFIG")} style={{backgroundColor: '#e02161'}}>
            <Icon name="add"/>
        </Fab>
    </Container>