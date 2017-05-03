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


export default MainPage = ({history, location}) => (
    <Container>
        <Header>
            <Body>
            <Title>Przyjazne Linie - Menadzer</Title>
            </Body>
        </Header>
        <Content>
            <Button block light onPress={() =>{history.push("/configurations")}}>
                <Text>Konfiguracje</Text>
            </Button>
            <Button block light disabled>
                <Text>Zasoby</Text>
            </Button>


        </Content>
        <Footer>
            <Body>
                <Button full light>
                    <Left/>
                    <Body><Text>Przejdz do aplikacji</Text></Body>
                    <Right><Icon name="arrow-round-forward"/></Right>
                </Button>
            </Body>
        </Footer>
    </Container>
)