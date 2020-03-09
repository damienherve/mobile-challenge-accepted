import { call, put, takeLatest, select } from 'redux-saga/effects'
import {
  fetchExpenses,
  FetchExpensesResponse,
  updateComment,
  UpdatedExpenseResponse,
  addReceipt
} from '@APIs/ExpensesApi'
import * as Actions from './ExpensesActions'
import * as constants from './constants'
import { StoreState } from '@Store'

// Workers

// Fetch 20 more expenses
function* fetchExpensesSaga(action: Actions.FetchExpensesRequestAction) {
  try {
    const state: StoreState = yield select()
    const payload = {
      limit: 20,
      offset: Object.keys(state.expenses.data).length
    }
    console.log('payload', payload)
    let response: FetchExpensesResponse = yield call(fetchExpenses, payload)
    yield put(Actions.fetchExpensesSuccess(response.data))
  } catch (e) {
    yield put(Actions.fetchExpensesFailure(e))
  }
}

function* updateCommentSaga(action: Actions.UpdateCommentRequestAction) {
  try {
    let response: UpdatedExpenseResponse = yield call(
      updateComment,
      action.payload.id,
      action.payload.comment
    )
    yield put(Actions.updateCommentSuccess(response.data))
  } catch (e) {
    yield put(Actions.updateCommentFailure(e))
  }
}

function* addReceiptSaga(action: Actions.AddReceiptRequestAction) {
  try {
    let response: UpdatedExpenseResponse = yield call(
      addReceipt,
      action.payload.id,
      action.payload.receiptUri
    )
    yield put(Actions.addReceiptSuccess(response.data))
  } catch (e) {
    yield put(Actions.addReceiptFailure(e))
  }
}

// Watchers
export function* fetchExpensesWatcher() {
  yield takeLatest(constants.FETCH_EXPENSES_REQUEST, fetchExpensesSaga)
}

export function* updateCommentWatcher() {
  yield takeLatest(constants.UPDATE_COMMENT_REQUEST, updateCommentSaga)
}

export function* addReceiptWatcher() {
  yield takeLatest(constants.ADD_RECEIPT_REQUEST, addReceiptSaga)
}
