import { fork, take, cancel } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { registeredDeviceListSaga, deviceListSaga } from './deviceList'
import { settingsSaga } from './settings'
import { deviceSaga } from './device'

export function* rootSaga() {
  // settings saga runs on every page
  yield fork(settingsSaga)
  // handle view changes and spawn appropriate sagas
  yield takeEvery('@@router/LOCATION_CHANGE', routeHandler)
}

function* routeHandler(action) {
  let saga
  let route = action.payload.pathname
  if (route === '/') {
    saga = yield fork(registeredDeviceListSaga)
  } else if (/device/i.test(route)) {
    // check if its a single device page
    saga = yield fork(deviceSaga, route.split("/").pop())
  } else if (route === '/discover') {
    saga = yield fork(deviceListSaga)
  }
  // kill sagas when route changes
  yield take('@@router/LOCATION_CHANGE')
  yield cancel(saga)
}
