import { Expense } from '../types'
import { FetchExpensesData } from '../../APIs/ExpensesApi'
import * as constants from './constants'

export interface FetchExpensesRequestAction {
    type: typeof constants.FETCH_EXPENSES_REQUEST
    payload: {
        limit?: number
        offset?: number
    }
}

export interface FetchExpensesSuccessAction {
    type: typeof constants.FETCH_EXPENSES_SUCCESS
    payload: FetchExpensesData
}

export interface FetchExpensesFailureAction {
    type: typeof constants.FETCH_EXPENSES_FAILURE
    errorMessage?: string
}

export interface UpdateCommentRequestAction {
    type: typeof constants.UPDATE_COMMENT_REQUEST
    payload: {
        id: string
        comment: string
    }
}

export interface UpdateCommentSuccessAction {
    type: typeof constants.UPDATE_COMMENT_SUCCESS
    expense: Expense
}

export interface UpdateCommentFailureAction {
    type: typeof constants.UPDATE_COMMENT_FAILURE
    errorMessage?: string
}

// Action Definitions
export function fetchExpenses(
    limit?: number,
    offset?: number
): ExpensesRequestAction {
    return {
        type: constants.FETCH_EXPENSES_REQUEST,
        payload: {
            limit,
            offset
        }
    }
}

export function fetchExpensesSuccess(
    payload: FetchExpensesData
): ExpensesResponseAction {
    return {
        type: constants.FETCH_EXPENSES_SUCCESS,
        payload
    }
}

export function fetchExpensesFailure(
    errorMessage?: string
): ExpensesResponseAction {
    return {
        type: constants.FETCH_EXPENSES_FAILURE,
        errorMessage
    }
}

export function updateComment(
    id: string,
    comment: string
): ExpensesRequestAction {
    return {
        type: constants.UPDATE_COMMENT_REQUEST,
        payload: {
            id,
            comment
        }
    }
}

export function updateCommentSuccess(expense: Expense): ExpensesResponseAction {
    return {
        type: constants.UPDATE_COMMENT_SUCCESS,
        expense
    }
}

export function updateCommentFailure(
    errorMessage?: string
): ExpensesResponseAction {
    return {
        type: constants.UPDATE_COMMENT_FAILURE,
        errorMessage
    }
}

export type ExpensesRequestAction =
    | FetchExpensesRequestAction
    | UpdateCommentRequestAction

export type ExpensesResponseAction =
    | FetchExpensesSuccessAction
    | FetchExpensesFailureAction
    | UpdateCommentSuccessAction
    | UpdateCommentFailureAction
