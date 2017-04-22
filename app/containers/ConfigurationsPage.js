import React from "react"

import {Container, Fab, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left, Right, List, ListItem} from 'native-base'


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
            <List>
                {configurations.map(config => (
                    <ListItem key={config}>
                        <Text>{config}</Text>
                        <Right>
                            <Icon name="more"/>
                        </Right>
                    </ListItem>
                ))}
            </List>

        </Content>
        <Fab onPress={() => console.log("ADD CONFIG")} containerStyle={{marginRight:200}} style={{backgroundColor: '#e02161', marginRight:100}}>
            <Icon name="add"/>
        </Fab>
    </Container>