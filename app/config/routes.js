import React from "react"
import {NativeRouter, Route, Switch} from "react-router-native"
import MainPage from "../containers/MainPage"
import CreatorPage from "../containers/CreatorPage"
import ConfigurationsPage from "../containers/ConfigurationsPage"



export default Router = () =>
    <NativeRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/configurations" component={ConfigurationsPage}/>
            <Route path="/creator" component={CreatorPage}/>
        </Switch>
    </NativeRouter>