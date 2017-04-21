import React from "react"
import {NativeRouter, Route, Switch} from "react-router-native"
import MainPage from "../containers/MainPage"


export default Router = ({}) =>
    <NativeRouter>
        <Switch>
            <Route path="/" component={MainPage}/>
        </Switch>
    </NativeRouter>