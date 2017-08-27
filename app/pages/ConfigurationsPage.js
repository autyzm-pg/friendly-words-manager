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
import {changeConfigsSearchQuery, changeActiveConfig, saveConfig, deleteConfig} from "../redux/configurations/actions"
import {ActionItem, ActionsMenu} from "../components/containers/ActionsMenu"
import {getNameOfCopy} from "../libs/funcs"
import {Modal, onSuccess} from "../components/modal/Modal"
import {ModeTypes} from "../db/format"
import {withLog} from "../libs/confy/libs/debug"

const ConfigurationsPage = ({history, configurations, allConfigs, activeMessage, searchQuery, onSearchChange, actions, isDeleteEnabled}) =>
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
                                item={config}
                                active={activeMessage(config)}
                                onSetActive={actions.changeActiveConfig}
                    >
                        <ActionsMenu>
                            <ActionItem onSelect={() => actions.duplicate(allConfigs, config)}>
                                <Icon name="copy"/>
                            </ActionItem>
                            <ActionItem onSelect={() => history.push(`/creator/${config.id}`)}>
                                <Icon name="create"/>
                            </ActionItem>
                            <ActionItem onSelect={() => actions.changeActiveConfig(config.id)}>
                                <Icon name="arrow-up"/>
                            </ActionItem>
                            <ActionItem isEnabled={isDeleteEnabled} onSelect={() => actions.delete(config)}>
                                <Icon name="close"/>
                            </ActionItem>
                        </ActionsMenu>
                    </ConfigElem>
                ))}
            </ConfigList>
        </Content>

        <Fab active={false} onPress={() => history.push("/creator")} style={{backgroundColor: '#e02161'}}>
            <Icon name="add"/>
        </Fab>
    </Container>

const stateToProps = ({configurations}) => ({
    allConfigs: configurations.all,
    configurations: R.reverse(configurations.all.filter(({name}) => name.toLowerCase().includes(configurations.searchQuery))),
    searchQuery: configurations.searchQuery,
    activeMessage: R.ifElse(
        config => config.id === configurations.active.id,
        () => configurations.active.mode === ModeTypes.learning ? "aktywne uczenie" : "aktywny test",
        R.always(undefined)
    ),
    isDeleteEnabled: configurations.all.length > 1
})

const askForMode = () => Modal.optionAsk("W jakim trybie chcesz aktywować krok?", [
    {verbose: "Uczenie", value: ModeTypes.learning, primary: true},
    {verbose: "Test", value: ModeTypes.test}
]).then(R.prop('value'))

const dispatchToProps = (dispatch, ownProps) => ({
    onSearchChange: R.compose(dispatch, changeConfigsSearchQuery),
    actions: {
        changeActiveConfig: id => askForMode().then(mode => dispatch(changeActiveConfig({id, mode}))),
        duplicate: R.compose(
            dispatch,
            R.apply(saveConfig),
            (allConfigs, config) => [
                getNameOfCopy(allConfigs.map(R.prop('name')), config.name),
                config.config
            ]
        ),
        delete: (config) => Modal.ask(`Czy napewno chcesz usunąć '${config.name}'?`, false)
            .then(onSuccess(() => dispatch(deleteConfig.start(config))))
    }
})

export default R.compose(
    connect(stateToProps, dispatchToProps)
)(ConfigurationsPage)