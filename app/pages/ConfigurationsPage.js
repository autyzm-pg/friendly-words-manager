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
import {changeConfigsSearchQuery, changeActiveConfig, saveConfig} from "../redux/configurations/actions"
import Menu, {MenuContext, MenuOption, MenuOptions, MenuTrigger} from "react-native-menu"
import {ActionItem, ActionsMenu} from "../components/containers/ActionsMenu"
import {getNameOfCopy} from "../libs/funcs"

const ConfigurationsPage = ({history, configurations, allConfigs, isActive, searchQuery, onSearchChange, actions}) =>
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
                                    onSetActive={actions.changeActiveConfig}
                        >
                            <ActionsMenu>
                                <ActionItem onSelect={() => actions.duplicate(allConfigs, config)}>
                                    <Icon name="copy"/>
                                </ActionItem>
                                <ActionItem onSelect={() => console.log("Edytuj", config)}>
                                    <Icon name="create"/>
                                </ActionItem>
                                <ActionItem onSelect={() => actions.changeActiveConfig(config.name)}>
                                    <Icon name="arrow-up"/>
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
    allConfigs: configurations.all,
    configurations: configurations.all.filter(({name}) => name.toLowerCase().includes(configurations.searchQuery)),
    searchQuery: configurations.searchQuery,
    isActive: config => config.name === configurations.active
})

const dispatchToProps = dispatch => ({
    onSearchChange: R.compose(dispatch, changeConfigsSearchQuery),
    actions: {
        changeActiveConfig: R.compose(dispatch, changeActiveConfig),
        duplicate: R.compose(
            dispatch,
            R.apply(saveConfig),
            R.tap(console.log),
            (allConfigs, config) => [
                getNameOfCopy(allConfigs.map(R.prop('name')), config.name),
                config.config
            ]
        )
    }
})

export default connect(stateToProps, dispatchToProps)(ConfigurationsPage)