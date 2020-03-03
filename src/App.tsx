/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { View, Text } from 'react-native'
import { store } from '@Config/ReduxConfig'
import { Provider } from 'react-redux'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { AppStack } from './Navigation/AppNavigator'
import 'react-native-gesture-handler'
import '@Config/ReactotronConfig'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <AppStack />
                </NavigationContainer>
            </Provider>
        )
    }
}
