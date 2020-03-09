import React, { Dispatch } from 'react'
import {
  View,
  ListRenderItem,
  ActivityIndicator,
  SectionList,
  Text,
  StyleSheet
} from 'react-native'
import { Expense, ExpensesUI, ExpensesByDate } from '@Store/types'
import { StoreState } from '@Store'
import * as actions from '@Store/Expenses/ExpensesActions'
import { connect } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import ListItem from '@Components/ListItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SearchBar } from 'react-native-elements'
import Colors from '@Styles/Colors'
import {
  getExpensesUI,
  canFetchMoreExpenses,
  getFilteredExpensesByDate
} from '@Store/Expenses/ExpensesSelectors'

export interface ExpensesListScreenProps {
  filteredExpenses?: ExpensesByDate[]
  ui?: ExpensesUI
  canFetchMoreExpenses: boolean
  fetchExpenses?: () => void
  updateComment?: (id: string, comment: string) => void
  addReceipt?: (id: string, receiptUri: string) => void
  updateSearchFilter?: (searchFilter: string) => void
}

class ExpensesListScreen extends React.Component<ExpensesListScreenProps> {
  componentDidMount() {
    this._loadMoreExpenses()
  }

  _loadMoreExpenses = () => {
    if (this.props.canFetchMoreExpenses) {
      this.props.fetchExpenses()
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

  _renderSectionHeader = ({ section }) => (
    <View style={{ padding: 8, backgroundColor: 'white' }}>
      <Text style={{ color: 'black' }}>{section.title.toUpperCase()}</Text>
    </View>
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
          inputContainerStyle={{ backgroundColor: Colors.searchBar }}
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent'
          }}
          style={{ backgroundColor: 'red' }}
        />
        <SectionList<Expense>
          sections={this.props.filteredExpenses}
          keyExtractor={(item, index) => item.id}
          renderSectionHeader={this._renderSectionHeader}
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
    filteredExpenses: getFilteredExpensesByDate(state.expenses),
    ui: getExpensesUI(state.expenses),
    canFetchMoreExpenses: canFetchMoreExpenses(state.expenses)
  }
}

export function mapDispatchToProps(dispatch: Dispatch<actions.ExpensesActionType>) {
  return {
    fetchExpenses: () => dispatch(actions.fetchExpenses()),
    updateComment: (id, comment) => dispatch(actions.updateComment(id, comment)),
    addReceipt: (id: string, receiptUri: string) => dispatch(actions.addReceipt(id, receiptUri)),
    updateSearchFilter: (searchFilter: string) => dispatch(actions.updateSearchFilter(searchFilter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesListScreen)

const styles = StyleSheet.create({})
