import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import Main from "./app/index";

const confy = () => (
    <Main/>
)

export default confy


AppRegistry.registerComponent('confy', () => confy);
