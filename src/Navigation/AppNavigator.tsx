import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParams } from './types'
import ExpensesListScreen from '@Screens/ExpensesListScreen'

const RootStack = createStackNavigator<RootStackParams>()

export function AppStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Expenses" component={ExpensesListScreen} />
    </RootStack.Navigator>
  )
}
