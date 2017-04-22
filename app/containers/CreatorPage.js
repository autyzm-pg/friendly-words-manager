import React from "react"
import {Container, Content, Header, Body, Title, Button, Text, Tab, Tabs, TabHeading, Icon, Left} from 'native-base'

export default CreatorPage = () =>
    <Container>
        <Header hasTabs>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
        </Header>
        <Tabs>
            <Tab heading={ <TabHeading><Text>Tryby</Text></TabHeading>}>
                <Text>Raz</Text>
            </Tab>
            <Tab heading={ <TabHeading><Text>Opcje</Text></TabHeading>}>
                <Text>Dwa</Text>
            </Tab>
            <Tab heading={ <TabHeading><Text>Nagrody</Text></TabHeading>}>
                <Text>Trzy</Text>
            </Tab>
            <Tab heading={ <TabHeading><Text>Rozgrywka</Text></TabHeading>}>
                <Text>Trzy</Text>
            </Tab>
        </Tabs>
    </Container>