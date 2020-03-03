import { ExpensesState, Expense } from '../types'
import { ExpensesResponseAction } from './ExpensesActions'
import _ from 'lodash'
import * as constants from './constants'

export const initialState: ExpensesState = {
    data: {},
    total: 0
}

export function expensesReducer(
    state = initialState,
    action: ExpensesResponseAction
): ExpensesState {
    switch (action.type) {
        case constants.FETCH_EXPENSES_SUCCESS:
            const { expenses, total } = action.payload
            return _.merge({}, state, {
                data: _.keyBy(expenses, 'id'),
                total
            })
        case constants.UPDATE_COMMENT_SUCCESS:
            return _.merge({}, state, {
                data: _.keyBy(action.expense, 'id'),
                total
            })
        default:
            return state
    }
}
