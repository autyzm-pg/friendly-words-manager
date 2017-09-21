import React from "react"
import {NativeRouter, Route, Switch} from "react-router-native"
import MainPage from "../pages/MainPage"
import CreatorPage from "../pages/CreatorPage"
import ConfigurationsPage from "../pages/ConfigurationsPage"
import {EditPage} from "../pages/EditPage"
import {WordModel} from "./model"
import {WordsPage} from "../pages/WordsPage"



export default Router = () =>
    <NativeRouter>
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/configurations" component={ConfigurationsPage}/>
            <Route path="/creator/:id" component={EditPage} />
            <Route path="/creator" component={CreatorPage}/>
            <Route path={`/resources/${WordModel.name}`} component={WordsPage}/>
        </Switch>
    </NativeRouter>