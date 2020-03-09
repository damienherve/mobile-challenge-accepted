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
export type UpdatedExpenseResponse = AxiosResponse<Expense>

export function fetchExpenses(payload: FetchExpensesParams): Promise<FetchExpensesResponse> {
  return Axios.get('/expenses', {
    params: payload
  })
}

export function updateComment(id: string, comment: string): Promise<UpdatedExpenseResponse> {
  return Axios.post('/expenses/' + id, {
    comment
  })
}

export function addReceipt(id: string, receiptUri: string): Promise<UpdatedExpenseResponse> {
  const formData = new FormData()
  formData.append('receipt', {
    uri: receiptUri,
    name: 'receipt.jpg',
    type: 'image/jpg'
  })
  return Axios.post('expenses/' + id + '/receipts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
