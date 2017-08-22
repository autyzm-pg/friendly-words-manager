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
import {ModeTypes} from "../db"
import {withLog} from "../libs/confy/libs/debug"

const ConfigurationsPage = ({history, configurations, allConfigs, activeMessage, searchQuery, onSearchChange, actions}) =>
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
                                active={activeMessage(config)}
                                onSetActive={actions.changeActiveConfig}
                    >
                        <ActionsMenu>
                            <ActionItem onSelect={() => actions.duplicate(allConfigs, config)}>
                                <Icon name="copy"/>
                            </ActionItem>
                            <ActionItem onSelect={() => history.push(`/creator/${config.name}`)}>
                                <Icon name="create"/>
                            </ActionItem>
                            <ActionItem onSelect={() => actions.changeActiveConfig(config.name)}>
                                <Icon name="arrow-up"/>
                            </ActionItem>
                            <ActionItem onSelect={() => actions.delete(config.name)}>
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
        config => config.name === configurations.active.name,
        () => configurations.active.mode === ModeTypes.learning ? "aktywne uczenie" : "aktywny test",
        R.always(undefined)
    )
})

const askForMode = () => Modal.optionAsk("W jakim trybie chcesz aktywować krok?", [
    {verbose: "Uczenie", value: ModeTypes.learning, primary: true},
    {verbose: "Test", value: ModeTypes.test}
]).then(R.prop('value'))

const dispatchToProps = (dispatch, ownProps) => ({
    onSearchChange: R.compose(dispatch, changeConfigsSearchQuery),
    actions: {
        changeActiveConfig: name => askForMode().then(withLog(mode => dispatch(changeActiveConfig({name, mode})))),
        duplicate: R.compose(
            dispatch,
            R.apply(saveConfig),
            R.tap(console.log),
            (allConfigs, config) => [
                getNameOfCopy(allConfigs.map(R.prop('name')), config.name),
                config.config
            ]
        ),
        delete: (name) => Modal.ask(`Czy napewno chcesz usunąć '${name}'?`, false)
            .then(onSuccess(() => dispatch(deleteConfig.start(name))))
    }
})

export default R.compose(
    connect(stateToProps, dispatchToProps)
)(ConfigurationsPage)