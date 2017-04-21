import React from "react"
import Provider from "react-redux/src/components/Provider"
import store from "./config/store"
import Layout from "./components/containers/Layout"
import Router from "./config/routes"

export default App = () => (
    <Provider store={store}>
        <Layout>
            <Router/>
        </Layout>
    </Provider>
)
