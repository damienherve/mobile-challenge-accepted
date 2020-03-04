import { AxiosResponse } from 'axios'

export type Expense = {
  id: string
  amount: Amount
  date: Date
  merchant: string
  receipts: Receipt[]
  comment: string
  category: string
  user: User
  index: number
}

export type Amount = {
  value: number
  currency: string
}

export type Receipt = {
  url: string
}

export type User = {
  first: string
  last: string
  email: string
}

interface Expenses {
  [key: string]: Expense
}

export type ExpensesState = {
  data: Expenses
  ui: {
    isFetching: boolean
    isUpdating: boolean
    isUploading: boolean
    errorMessage: string
  }
  total: number
}
