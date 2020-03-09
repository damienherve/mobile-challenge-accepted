import { createSelector } from 'reselect'
import { ExpensesState, ExpensesByDate } from '../types'
import _ from 'lodash'

export const getExpenses = (state: ExpensesState) => Object.values(state.data)

export const getExpensesUI = (state: ExpensesState) => state.ui

export const canFetchMoreExpenses = (state: ExpensesState) => {
  const totalFetchedExpenses = getExpenses(state).length
  const canFetchMore = totalFetchedExpenses == 0 || totalFetchedExpenses < state.ui.total
  const isNotFetching = !state.ui.isFetching
  return canFetchMore && isNotFetching
}

export const getFilteredExpensesByMerchant = createSelector(
  getExpenses,
  getExpensesUI,
  (expenses, expensesUI) => {
    return expenses.filter(expense =>
      expense.merchant.match(new RegExp(expensesUI.searchFilter, 'i'))
    )
  }
)

export const getFilteredExpensesByUser = createSelector(
  getExpenses,
  getExpensesUI,
  (expenses, expensesUI) => {
    return expenses.filter(expense => {
      const user = expense.user.first + ' ' + expense.user.last
      return user.match(new RegExp(expensesUI.searchFilter, 'i'))
    })
  }
)

export const getFilteredExpensesByAmount = createSelector(
  getExpenses,
  getExpensesUI,
  (expenses, expensesUI) => {
    return expenses.filter(expense => {
      return expense.amount.value.toString().indexOf(expensesUI.searchFilter) > -1
    })
  }
)

// Here we compose selectors to make a 'super filter' selector
export const getFilteredExpenses = createSelector(
  getFilteredExpensesByMerchant,
  getFilteredExpensesByUser,
  getFilteredExpensesByAmount,
  (expensesByMerchant, expensesByUser, expensesByAmount) => {
    return _.union(expensesByMerchant, expensesByUser, expensesByAmount)
  }
)

export const getFilteredExpensesByDate = createSelector(getFilteredExpenses, expenses => {
  const expensesByDate = _.groupBy(expenses, e => new Date(e.date).toLocaleDateString())
  const output: ExpensesByDate[] = []
  return _.reduce(
    expensesByDate,
    (acc, next, index) => {
      acc.push({
        title: index,
        data: next
      })
      return acc
    },
    output
  )
})
