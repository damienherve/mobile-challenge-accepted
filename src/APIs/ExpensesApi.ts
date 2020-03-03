import Axios from '@Config/AxiosConfig'
import { Expense } from '@Store/types'
import { AxiosResponse } from 'axios'

export type FetchExpensesParams = {
    limit?: number
    offset?: number
}

export type FetchExpensesData = {
    expenses: Expense[]
    total: number
}

export type FetchExpensesResponse = AxiosResponse<FetchExpensesData>
export type UpdateCommentResponse = AxiosResponse<Expense>

export function fetchExpenses(
    payload: FetchExpensesParams
): Promise<FetchExpensesResponse> {
    return Axios.get('/expenses', {
        params: payload
    })
}

export function updateComment(
    id: string,
    comment: string
): Promise<UpdateCommentResponse> {
    return Axios.post('/expenses/' + id, {
        comment
    })
}
