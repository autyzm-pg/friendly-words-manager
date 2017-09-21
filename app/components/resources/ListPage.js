import React from "react"
import {Body, Button, Container, Content, Fab, Header, Icon, Left, Right, Title} from "native-base"

export const ListPage = ({onBack, title, children, onFabPress}) =>
    <Container>
        <Header>
            <Left>
                <Button transparent onPress={onBack}>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body>
            <Title>{title}</Title>
            </Body>
            <Right/>
        </Header>

        <Content keyboardShouldPersistTaps="handled">
            {children}
        </Content>

        <Fab active={false} onPress={onFabPress} style={{backgroundColor: '#e02161'}}>
            <Icon name="add"/>
        </Fab>
    </Container>

