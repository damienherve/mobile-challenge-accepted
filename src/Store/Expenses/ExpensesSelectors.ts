import { createSelector } from 'reselect'
import { ExpensesState } from '../types'

export const getExpenses = (state: ExpensesState) => Object.values(state.data)

export const getExpensesUI = (state: ExpensesState) => state.ui

export const canFetchMoreExpenses = (state: ExpensesState) =>
  getExpenses(state).length < state.ui.total

export const getFilteredExpenses = createSelector(
  getExpenses,
  getExpensesUI,
  (expenses, expensesUI) => {
    return expenses.filter(expense =>
      expense.merchant.match(new RegExp(expensesUI.searchFilter, 'i'))
    )
  }
)
