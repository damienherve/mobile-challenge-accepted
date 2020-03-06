import { createSelector } from 'reselect'
import { ExpensesState } from '../types'
import _ from 'lodash'

export const getExpenses = (state: ExpensesState) => Object.values(state.data)

export const getExpensesUI = (state: ExpensesState) => state.ui

export const canFetchMoreExpenses = (state: ExpensesState) =>
  getExpenses(state).length < state.ui.total

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

export const getFilteredExpenses = createSelector(
  getFilteredExpensesByMerchant,
  getFilteredExpensesByUser,
  getFilteredExpensesByAmount,
  (expensesByMerchant, expensesByUser, expensesByAmount) => {
    return _.union(expensesByMerchant, expensesByUser, expensesByAmount)
  }
)
