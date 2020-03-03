import Axios from '@Config/AxiosConfig'
import { Expense } from '@Store/types'
import { AxiosResponse } from 'axios'
import { Image } from 'react-native'

export type FetchExpensesParams = {
    limit?: number
    offset?: number
}

export type FetchExpensesData = {
    expenses: Expense[]
    total: number
}

export type FetchExpensesResponse = AxiosResponse<FetchExpensesData>
export type UpdatedExpenseResponse = AxiosResponse<Expense>

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
): Promise<UpdatedExpenseResponse> {
    return Axios.post('/expenses/' + id, {
        comment
    })
}

export function addReceipt(
    id: string,
    receipt: Image
): Promise<UpdatedExpenseResponse> {
    const formData = new FormData()
    formData.append('receipt', receipt)
    return Axios.post('expenses/' + id + '/receipts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}
