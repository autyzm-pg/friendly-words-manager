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
import Menu, {MenuContext, MenuOption, MenuOptions, MenuTrigger} from "react-native-menu"
import {ActionItem, ActionsMenu} from "../components/containers/ActionsMenu"

const ConfigurationsPage = ({history, configurations, isActive, searchQuery, onSearchChange, changeActiveConfig}) =>
    <MenuContext style={{flex: 1}}>
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={() => history.push("/")}>
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
                        <ConfigElem key={config.name}
                                    item={config.name}
                                    active={isActive(config)}
                                    onSetActive={changeActiveConfig}
                        >
                            <ActionsMenu>
                                <ActionItem onSelect={() => console.log("Duplikuj", config)}>
                                    <Icon name="copy"/>
                                </ActionItem>
                                <ActionItem onSelect={() => console.log("Edytuj", config)}>
                                    <Icon name="create"/>
                                </ActionItem>
                                <ActionItem onSelect={() => console.log("Aktywuj", config)}>
                                    <Icon name="flash"/>
                                </ActionItem>
                                <ActionItem onSelect={() => console.log("Usun", config)}>
                                    <Icon name="close"/>
                                </ActionItem>
                            </ActionsMenu>
                        </ConfigElem>
                    ))}
                </ConfigList>
            </Content>

            <Fab onPress={() => history.push("/creator")} style={{backgroundColor: '#e02161'}}>
                <Icon name="add"/>
            </Fab>
        </Container>
    </MenuContext>

const stateToProps = ({configurations}) => ({
    configurations: configurations.all.filter(({name}) => name.toLowerCase().includes(configurations.searchQuery)),
    searchQuery: configurations.searchQuery,
    isActive: config => config.name === configurations.active
})

const dispatchToProps = dispatch => ({
    onSearchChange: R.compose(dispatch, changeConfigsSearchQuery),
    changeActiveConfig: R.compose(dispatch, changeActiveConfig)
})

export default connect(stateToProps, dispatchToProps)(ConfigurationsPage)