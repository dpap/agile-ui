// Any deviceList triggers go here
import { createRequestTypes, asyncActionFactory } from './utils'
import axios from 'axios'
// these function act as trigger functions to run sagas. They should only be called when a user interacts with the page.
// route handling triggers only occur when
export const device = asyncActionFactory('DEVICE')
export const deviceDelete = asyncActionFactory('DEVICE_DELETE')
export const deviceConnect = asyncActionFactory('DEVICE_CONNECT')

export function deviceGafanaLink(device) {
  return {
    type: 'GRAFANA_LINK',
    result: device
  }
}
