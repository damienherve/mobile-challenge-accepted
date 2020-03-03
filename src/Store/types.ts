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

interface ExpensesMap {
    [key: string]: Expense
}

export type ExpensesState = {
    data: ExpensesMap
    total: number
}
