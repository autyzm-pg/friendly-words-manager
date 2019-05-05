import React from "react"
import {Body, Button, Container, Header, Icon, Left, Right, Title} from "native-base"
import {fontStyles as fontStyle} from "../../../../../android/app/src/main/res/fontStyle";

export default Page = ({children}) => (
    <Container>
        {children}
    </Container>
)



export const PageHeader = ({children, onBack, header}) => (
    <Header hasTabs>
        <Left>
            <Button transparent onPress={onBack}>
                <Icon name='arrow-back'/>
            </Button>
        </Left>
        <Body><Title style={fontStyle.headerPage}>{header}</Title></Body>
        <Right>
            {children}
        </Right>
    </Header>
)