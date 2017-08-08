import React from "react"
import {NativeRouter, Route, Switch} from "react-router-native"
import MainPage from "../pages/MainPage"
import CreatorPage from "../pages/CreatorPage"
import ConfigurationsPage from "../pages/ConfigurationsPage"



export default Router = () =>
    <NativeRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/configurations" component={ConfigurationsPage}/>
            <Route path="/creator" component={CreatorPage}/>
        </Switch>
    </NativeRouter>