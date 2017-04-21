import React from "react"
import {NativeRouter} from "react-router-native"
import {Switch} from "react-native"
import MainPage from "../containers/MainPage"


export default Router = ({}) =>
    <NativeRouter>
        <Switch>
            <Route path="/" component={MainPage}/>
        </Switch>
    </NativeRouter>