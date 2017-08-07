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
import {connect} from "react-redux"
import * as R from "ramda"
import {changeConfigsSearchQuery, changeActiveConfig} from "../redux/configurations/actions"

const ConfigurationsPage = ({history, configurations, searchQuery, onSearchChange, changeActiveConfig}) =>
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

        <Content keyboardShouldPersistTaps="handled">
            <ConfigList onSearchChange={onSearchChange} searchQuery={searchQuery}>
                {configurations.map(config => (
                    <ConfigElem key={config.name} item={config.name}/>
                ))}
            </ConfigList>
            <Button onPress={() => changeActiveConfig("Maciej Paciej")}><Text>Zmień aktywną konfigurację</Text></Button>
        </Content>

        <Fab onPress={() => history.push("/creator")} style={{backgroundColor: '#e02161'}}>
            <Icon name="add"/>
        </Fab>
    </Container>

const stateToProps = ({configurations}) => ({
    configurations: configurations.all.filter(({name}) => name.toLowerCase().includes(configurations.searchQuery)),
    searchQuery: configurations.searchQuery
})

const dispatchToProps = dispatch => ({
    onSearchChange: R.compose(dispatch, changeConfigsSearchQuery),
    changeActiveConfig: R.compose(dispatch, changeActiveConfig)
})

export default connect(stateToProps, dispatchToProps)(ConfigurationsPage)