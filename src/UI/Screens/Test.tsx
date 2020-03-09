import React, { Dispatch } from 'react'
import { View, Button } from 'react-native'
import { Expense, ExpensesState } from '@Store/types'
import { StoreState } from '@Store'
import * as actions from '@Store/Expenses/ExpensesActions'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'

export interface ExpensesListScreenProps {
  expenses: ExpensesState
  fetchExpenses?: (limit: number, offset: number) => void
  updateComment?: (id: string, comment: string) => void
  addReceipt?: (id: string, receiptUri: string) => void
}

interface ExpensesListScreenState {
  offset: number
}

class ExpensesListScreen extends React.Component<
  ExpensesListScreenProps,
  ExpensesListScreenState
> {
  // Initial state
  state: Readonly<ExpensesListScreenState> = {
    offset: 0
  }

  componentDidUpdate(prevProps: ExpensesListScreenProps) {
    if (prevProps.expenses.data !== this.props.expenses.data) {
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
          title="Fetch 10 expenses"
          onPress={() => {
            this.props.fetchExpenses(10, offset)
          }}
        />
        <Button
          title="Update comment"
          onPress={() => {
            const keys = Object.keys(this.props.expenses.data)
            const expenseId = keys[0]
            if (expenseId) {
              this.props.updateComment(expenseId, 'This is a new comment')
            }
          }}
        />
        <Button
          title="Upload a Receipt"
          onPress={() => {
            const options = {
              title: 'Select Receipt',
              storageOptions: {
                skipBackup: true,
                path: 'images'
              }
            }

            /**
             * The first arg is the options object for customization (it can also be null or omitted for default options),
             * The second arg is the callback which sends object: response (more info in the API Reference)
             */
            ImagePicker.showImagePicker(options, response => {
              console.log('Response = ', response)

              if (response.didCancel) {
                console.log('User cancelled image picker')
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
              } else if (response.customButton) {
                console.log(
                  'User tapped custom button: ',
                  response.customButton
                )
              } else {
                const source = { uri: response.uri }

                const keys = Object.keys(this.props.expenses.data)
                const expenseId = keys[0]
                if (expenseId) {
                  this.props.addReceipt(expenseId, response.uri)
                }
              }
            })
          }}
        />
      </View>
    )
  }
}

export function mapStateToProps({ expenses }: StoreState) {
  return {
    expenses
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch<actions.ExpensesActionType>
) {
  return {
    fetchExpenses: (limit, offset) =>
      dispatch(actions.fetchExpenses(limit, offset)),
    updateComment: (id, comment) =>
      dispatch(actions.updateComment(id, comment)),
    addReceipt: (id: string, receiptUri: string) =>
      dispatch(actions.addReceipt(id, receiptUri))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListScreen)
