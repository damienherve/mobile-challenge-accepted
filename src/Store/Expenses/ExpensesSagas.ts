import { call, put, takeLatest } from 'redux-saga/effects'
import {
    fetchExpenses,
    FetchExpensesResponse,
    updateComment,
    UpdateCommentResponse
} from '@APIs/ExpensesApi'
import * as Actions from './ExpensesActions'
import * as constants from './constants'

// Workers
function* fetchExpensesSaga(action: Actions.FetchExpensesRequestAction) {
    try {
        let response: FetchExpensesResponse = yield call(
            fetchExpenses,
            action.payload
        )
        yield put(Actions.fetchExpensesSuccess(response.data))
    } catch (e) {
        yield put(Actions.fetchExpensesFailure(e))
    }
}

function* updateCommentSaga(action: Actions.UpdateCommentRequestAction) {
    try {
        let response: UpdateCommentResponse = yield call(
            updateComment,
            action.payload.id,
            action.payload.comment
        )
        yield put(Actions.updateCommentSuccess(response.data))
    } catch (e) {
        yield put(Actions.updateCommentFailure(e))
    }
}

// Watchers
export function* fetchExpensesWatcher() {
    yield takeLatest(constants.FETCH_EXPENSES_REQUEST, fetchExpensesSaga)
}

export function* updateCommentWatcher() {
    yield takeLatest(constants.UPDATE_COMMENT_REQUEST, updateCommentSaga)
}
