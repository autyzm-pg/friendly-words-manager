import React from "react"

import {Body, Button as NativeBaseButton, Container, Header, Text, Title, View} from 'native-base'

import {connect} from "react-redux"
import {ModeTypes} from "../db/format"
import {WordModel} from "../config/model"
import * as R from "ramda"
import styles from "./mainPageStyles"
import {withStyle} from "../libs/withStyle"

import * as constants from "../../android/app/src/main/res/constantStrings";
import {fontStyles} from "../../android/app/src/main/res/fontStyle";
import {logCurrentScreen} from "../events"


const buttonStyles = {
    height: 60,
    marginBottom: 5,
}
const Button = withStyle(buttonStyles)(NativeBaseButton)

const StatusContainer = withStyle({
    flexDirection: "row",
    justifyContent: "space-between"
})(View)

const MainPage = ({history, location, activeConfig, hasAnyConfig}) => {
    logCurrentScreen("Glowne menu")
    return (<Container>
        <Header>
            <Body>
            <Title style = {fontStyles.title} >{constants.AppTitle}</Title>
            </Body>
        </Header>
        <View style={styles.content}>
            <View style={styles.buttonsContainer}>
                <StatusContainer>
                    <Text style = {fontStyles.mainPageHeader} >{constants.ActiveConfiguration}</Text>
                    {
                        hasAnyConfig ? (
                            <Text style = {fontStyles.mainPageHeader} >
                                {activeConfig.name} ({activeConfig.mode === ModeTypes.learning ? constants.Learning : constants.Test})
                            </Text>
                        ) : <Text>{constants.Lack}</Text>
                    }

                </StatusContainer>
                <View>
                    <Button block light onPress={() => {
                        history.push("/configurations")
                    }}>
                        <Text style = {fontStyles.mainPageButton} >{constants.Configurations}</Text>
                    </Button>
                    <Button block light onPress={() => {
                        history.push(`/resources/${WordModel.name}`)
                    }}>
                        <Text style = {fontStyles.mainPageButton} >{constants.Resources}</Text>
                    </Button>
                </View>
                {/*<Button full light onPress={() => Linking.openURL("expd16bca44a7e84f759fcce334a17cc6ea://")}>*/}
                {/*<Text>Przejdź do aplikacji</Text>*/}
                {/*<Icon name="arrow-round-forward"/>*/}
                {/*</Button>*/}
            </View>
        </View>
    </Container>)
}

const stateToProps = ({configurations}) => ({
    activeConfig: {
        id: configurations.active.id,
        mode: configurations.active.mode,
        name: R.propOr('Brak', "name", configurations.all.find(config => config.id === configurations.active.id))
    },
    hasAnyConfig: configurations.all.length > 0
})

export default connect(stateToProps)(MainPage)
