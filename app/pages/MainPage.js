import React from "react"

import {
    Container,
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
    Footer,
    FooterTab
} from 'native-base'

import {connect} from "react-redux"
import ToastExt from "../libs/ToastExt"


const MainPage = ({history, location, activeConfig}) => (
    <Container>
        <Header>
            <Body>
            <Title>Przyjazne Linie - Menadzer</Title>
            </Body>
        </Header>
        <Content>
            <Button block light onPress={() => {
                history.push("/configurations")
            }}>
                <Text>Konfiguracje</Text>
            </Button>
            <Button block light disabled>
                <Text>Zasoby</Text>
            </Button>
        </Content>
        <Footer>
            <Text>Aktywna konfiguracja: {activeConfig}</Text>
            <Body>
            <Button full light  onPress={() =>{console.log("DUPA@"); ToastExt.success("asdasd")}}>
                <Body><Text>Przejdz do aplikacji</Text></Body>
                <Right><Icon name="arrow-round-forward"/></Right>
            </Button>
            </Body>
        </Footer>
    </Container>
)

const stateToProps = ({configurations}) => ({
    activeConfig: configurations.active
})

export default connect(stateToProps)(MainPage)