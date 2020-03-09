import { ExpensesState } from '../types'
import { ExpensesActionType } from './ExpensesActions'
import _ from 'lodash'
import * as constants from './constants'

export const initialState: ExpensesState = {
  data: {},
  ui: {
    isFetching: false,
    isUpdating: false,
    isUploading: false,
    errorMessage: null,
    searchFilter: '',
    total: 0
  }
}

export function expensesReducer(state = initialState, action: ExpensesActionType): ExpensesState {
  switch (action.type) {
    case constants.FETCH_EXPENSES_REQUEST:
      return _.merge({}, state, {
        ui: {
          isFetching: true,
          errorMessage: null
        }
      })
    case constants.FETCH_EXPENSES_SUCCESS:
      const { expenses, total } = action.payload
      return _.merge({}, state, {
        data: _.keyBy(expenses, 'id'),
        ui: {
          isFetching: false,
          errorMessage: null,
          total
        }
      })
    case constants.UPDATE_COMMENT_REQUEST:
      return _.merge({}, state, {
        ui: {
          isUpdating: true,
          errorMessage: null
        }
      })
    case constants.UPDATE_COMMENT_SUCCESS:
      return _.merge({}, state, {
        data: {
          [action.expense.id]: action.expense
        },
        ui: {
          isUpdating: false
        }
      })
    case constants.ADD_RECEIPT_REQUEST:
      return _.merge({}, state, {
        ui: {
          isUploading: true
        }
      })
    case constants.ADD_RECEIPT_SUCCESS:
      return _.merge({}, state, {
        data: {
          [action.expense.id]: action.expense
        },
        ui: {
          isUploading: false,
          errorMessage: null
        }
      })
    case constants.FETCH_EXPENSES_FAILURE:
    case constants.ADD_RECEIPT_FAILURE:
    case constants.UPDATE_COMMENT_FAILURE:
      return _.merge({}, state, {
        ui: {
          isFetching: false,
          isUpdating: false,
          isUploading: false,
          errorMessage: action.errorMessage
        }
      })
    case constants.UPDATE_SEARCH_FILTER:
      return _.merge({}, state, {
        ui: {
          searchFilter: action.searchFilter
        }
      })
    default:
      return state
  }
}
