import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import { newMessage } from '../actions/messages'

export function* websocketSaga() {
  yield takeEvery(['SOCKET_CONNECTION'], websocketConnected)
}

function* websocketConnected(action) {
  yield put(newMessage('Socket connection established!'))
}
