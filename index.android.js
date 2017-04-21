import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from "./app/index";

const confy = () => (
    <App/>
)

export default confy


AppRegistry.registerComponent('confy', () => confy);
