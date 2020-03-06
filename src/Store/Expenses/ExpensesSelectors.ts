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

export const getFilteredExpenses = createSelector(
  getFilteredExpensesByMerchant,
  getFilteredExpensesByUser,
  (expensesByMerchant, expensesByUser) => {
    return _.union(expensesByMerchant, expensesByUser)
  }
)
