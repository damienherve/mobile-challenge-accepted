import React, { Dispatch } from 'react'
import { View, ListRenderItem, ActivityIndicator } from 'react-native'
import { Expense, ExpensesUI } from '@Store/types'
import { StoreState } from '@Store'
import * as actions from '@Store/Expenses/ExpensesActions'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import ListItem from '@Components/ListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-elements'
import Colors from '@Styles/Colors'
import {
  getExpenses,
  getFilteredExpenses,
  getExpensesUI,
  canFetchMoreExpenses
} from '@Store/Expenses/ExpensesSelectors'

export interface ExpensesListScreenProps {
  filteredExpenses?: Expense[]
  ui?: ExpensesUI
  canFetchMoreExpenses: boolean
  fetchExpenses?: (limit: number, offset: number) => void
  updateComment?: (id: string, comment: string) => void
  addReceipt?: (id: string, receiptUri: string) => void
  updateSearchFilter?: (searchFilter: string) => void
}

interface ExpensesListScreenState {
  offset: number
}

class ExpensesListScreen extends React.Component<ExpensesListScreenProps, ExpensesListScreenState> {
  // Initial state
  state: Readonly<ExpensesListScreenState> = {
    offset: 0
  }

  componentDidMount() {
    this._loadMoreExpenses()
  }

  componentDidUpdate(prevProps: ExpensesListScreenProps) {
    if (prevProps.filteredExpenses !== this.props.filteredExpenses) {
      this.setState({
        offset: this.props.filteredExpenses.length
      })
    }
  }

  _loadMoreExpenses = () => {
    const nbExpenses = this.props.filteredExpenses.length
    const totalExpenses = this.props.ui.total
    if (this.props.ui.isFetching) return
    if (this.state.offset == 0 || nbExpenses != totalExpenses) {
      this.props.fetchExpenses(10, this.state.offset)
    }
  }

  _renderFooter = () => {
    if (!this.props.ui.isFetching) return null
    return <ActivityIndicator color={'#000'} />
  }

  _renderItem: ListRenderItem<Expense> = ({ item }) => (
    <ListItem
      containerStyle={{ margin: 10, borderRadius: 10 }}
      title={item.merchant}
      rightTitle={item.amount.value.toString() + ' ' + item.amount.currency}
      subtitle={item.user.first + ' ' + item.user.last}
    />
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <SearchBar
          showCancel
          onChangeText={search => {
            this.props.updateSearchFilter(search)
          }}
          value={this.props.ui.searchFilter}
          lightTheme
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <FlatList<Expense>
          contentContainerStyle={{ paddingBottom: 30 }}
          keyExtractor={(item, index) => item.id}
          data={this.props.filteredExpenses}
          renderItem={this._renderItem}
          onEndReachedThreshold={0.01}
          onMomentumScrollEnd={() => {
            this._loadMoreExpenses()
          }}
          ListFooterComponent={this._renderFooter}
        />
      </View>
    )
  }
}

export function mapStateToProps(state: StoreState) {
  return {
    filteredExpenses: getFilteredExpenses(state.expenses),
    ui: getExpensesUI(state.expenses),
    canFetchMoreExpenses: canFetchMoreExpenses(state.expenses)
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ExpensesActionType>) {
  return {
    fetchExpenses: (limit, offset) => dispatch(actions.fetchExpenses(limit, offset)),
    updateComment: (id, comment) => dispatch(actions.updateComment(id, comment)),
    addReceipt: (id: string, receiptUri: string) => dispatch(actions.addReceipt(id, receiptUri)),
    updateSearchFilter: (searchFilter: string) => dispatch(actions.updateSearchFilter(searchFilter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListScreen)
