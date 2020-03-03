import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import {
    fetchExpensesWatcher,
    updateCommentWatcher,
    addReceiptWatcher
} from './Expenses/ExpensesSagas'
import { expensesReducer } from './Expenses/ExpensesReducers'

// create RootSaga
export function* rootSaga() {
    yield all([
        fetchExpensesWatcher(),
        updateCommentWatcher(),
        addReceiptWatcher()
    ])
}

export const rootReducer = combineReducers({
    expenses: expensesReducer
})

export type StoreState = ReturnType<typeof rootReducer>
