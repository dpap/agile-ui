import { takeEvery, delay } from 'redux-saga'
import { call, put, select, fork } from 'redux-saga/effects'
import { redirect, fetchEntity } from './utils'
import * as actions from '../actions/device'
import { newMessage } from '../actions/messages'
import { agileCore } from '../services'
import { getCachedDevice } from '../reducers/selectors'

import axios from 'axios'
import { DEVICE_API } from '../constants/Endpoints'

export const deviceFetch = fetchEntity.bind(null, actions.device, agileCore.deviceFetch)
export const deviceDelete = DeviceDeleteSaga.bind(null, actions.deviceDelete, agileCore.deviceDelete)
export const deviceConnect = DeviceConnectSaga.bind(null, actions.deviceConnect, agileCore.deviceConnect)

// load user unless it is cached
function* loadDeviceSaga(deviceId) {
  const device = yield select(getCachedDevice, deviceId)
  if (!device) {
    yield call(deviceFetch, deviceId)
  }
}

export function* DeviceConnectSaga(entity, apiFn, id) {
  const {response, error} = yield call(apiFn, id)
  if(response) {
    yield put( entity.success(id, response) )
    yield put(newMessage(`Successfully connected to device ${id}`))
    // send user back to discover
  } else {
    yield put( entity.failure(id, error) )
    yield put(newMessage(error))
  }
}

export function* DeviceDeleteSaga(entity, apiFn, id) {
  const {response, error} = yield call(apiFn, id)
  if(response) {
    yield put( entity.success(id, response) )
    yield put(newMessage(`Successfully deleted device ${id}`))
    // send user back to discover
    yield redirect('/')
  } else {
    yield put( entity.failure(id, error) )
    yield put(newMessage(error))
  }
}

export function* grafanaLinkSaga(action) {
  console.log('action', action)
  yield put(newMessage(`Opening visualizations for ${ action.result.name }`))
  // Make a request for a user with a given ID
  axios.get(`${DEVICE_API}/grafana`)
  .then(function (response) {
    window.open(`https://${response.data}/${ action.result.deviceId }`,'_blank')
  })
  .catch(function (error) {
    put(newMessage(error))
  })

}

export function* deviceSaga(id) {
  // get the deviceID from route
  // fetch the device
  yield call(loadDeviceSaga, id)
  yield fork(watchConnect, id)
  yield fork(watchDelete, id)
  yield fork(watchGrafana)
}

function* watchConnect(id) {
  yield takeEvery(['DEVICE_CONNECT_REQUEST'], deviceConnect, id)
}

function* watchDelete(id) {
  yield takeEvery(['DEVICE_DELETE_REQUEST'], deviceDelete, id)
}

function* watchGrafana(id) {
  yield takeEvery(['GRAFANA_LINK'], grafanaLinkSaga)
}
