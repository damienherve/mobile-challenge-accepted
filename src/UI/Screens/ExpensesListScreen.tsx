import React, { Dispatch } from 'react'
import { View, Text, Button } from "react-native"
import { Expense, ExpensesState } from '@Store/types'
import { StoreState } from '@Store'
import * as actions from '@Store/Expenses/ExpensesActions'
import { connect } from 'react-redux'

export interface ExpensesListScreenProps {
  expenses: ExpensesState,
  fetchExpenses?: (limit: number, offset: number)=> void
  updateComment?: (id: string, comment: string)=> void
}

interface ExpensesListScreenState {
  offset: number
}

class ExpensesListScreen extends React.Component<ExpensesListScreenProps, ExpensesListScreenState> {

  // Initial state
  state: Readonly<ExpensesListScreenState> = {
    offset: 0
  }

  componentDidUpdate(prevProps: ExpensesListScreenProps) {
    if(prevProps.expenses.data !== this.props.expenses.data) {
      this.setState({
        offset: Object.keys(this.props.expenses.data).length
      })
    }
  }

  render() {
    const { offset } = this.state
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button 
          title= 'Fetch 10 expenses'
          onPress={() => {
            this.props.fetchExpenses(10, offset)
          }}/>
        <Button 
          title= 'Update comment'
          onPress={() => {
            const keys = Object.keys(this.props.expenses.data)
            const expenseId = keys[0]
            if(expenseId) {
              this.props.updateComment(expenseId, 'This is a new comment')
            }
          }}/>
      </View>
    )
  }
}

export function mapStateToProps({ expenses }: StoreState) {
  return {
    expenses
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ExpensesRequestAction>) {
  return {
    fetchExpenses: (limit, offset) => dispatch(actions.fetchExpenses(limit, offset)),
    updateComment: (id, comment) => dispatch(actions.updateComment(id, comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListScreen)