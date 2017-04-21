import React from "react"
import {Container, Content, Header, Body, Title, Button, Text} from 'native-base';

export default MainPage = () =>
    <Container>
        <Header><Body><Title>Manager app</Title></Body></Header>
        <Content>
            <Button>
                <Text>Welcome to Main page</Text>
            </Button>
        </Content>
    </Container>