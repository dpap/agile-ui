import { delay, takeEvery } from 'redux-saga'
import { call, cancelled, put, fork } from 'redux-saga/effects'
import * as actions from '../actions/deviceList'
import { redirect, fetchEntity } from './utils'
import { agileCore } from '../services'
import { newMessage } from '../actions/messages'

export const registeredDeviceList = fetchEntity.bind(null, actions.registeredDevices, agileCore.registeredDevicesFetch)
export const deviceList = fetchEntity.bind(null, actions.devices, agileCore.devicesFetch)

// TODO make deviceRegister live in root watching on every view
export const deviceRegister = DeviceRegisterSaga.bind(null, actions.deviceRegister, agileCore.deviceRegister)

function* _deviceListPoll(fn) {
  try {
    while (true) {
      yield call(fn)
      yield call(delay, 3000)
    }
  } finally {
    if (yield cancelled())
      // any clean up actions here
      yield
  }
}


export function* DeviceRegisterSaga(entity, apiFn, action) {

  let typeofObj = yield call(agileCore.deviceTypeof, action.result)
  let deviceType

  if (typeofObj.response.data) {
    console.log(typeofObj.response.data[0])
    deviceType = typeofObj.response.data[0]
  } else {
    deviceType = ''
    yield put(newMessage(typeofObj.error))
  }

  let device = action.result
  let newDevice = {
    overview: {
      id: device.id,
      protocol: device.protocol,
      name: device.name,
      status: device.status
    },
    type: deviceType
  }

  const {response, error} = yield call(apiFn, newDevice)

  if(response) {
    yield put( entity.success(newDevice, response) )
    yield put(newMessage(`Successfully registered device ${device.name}`))
    yield redirect('/')
  } else {
    yield put( entity.failure(newDevice, error) )
    yield put(newMessage(error))
  }
}

export function* registeredDeviceListSaga() {
  yield call(registeredDeviceList)
  yield fork(_deviceListPoll, registeredDeviceList)
}

export function* deviceListSaga() {
  yield call(deviceList)
  yield fork(_deviceListPoll, deviceList)
  yield takeEvery(['DEVICE_REGISTER_REQUEST'], deviceRegister)
}
