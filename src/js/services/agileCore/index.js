import axios from 'axios'
import { normalize } from 'normalizr'
import {
  registeredDeviceSchema,
  registeredDeviceSchemaArray,
  deviceSchemaArray,
  protocolsSchemaArray
} from './schema'

const AGILE_API = '/api'

import { isEmpty } from 'lodash'

function callApi(method, url, body, schema) {
  return axios({
    method: method,
    url: url,
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify(body)
  })
  .then(response => {
    // check if there is content
    if (isEmpty(response.data))
      return response
    if (response.status === 204 || !schema)
      return response
    return Object.assign({},
      normalize(response.data, schema)
    )
  })
  .then(
    response => ({response})
  )
  .catch(error => ({error: error.message || 'Something bad happened'}))
}

// entities
export const deviceFetch = deviceId => callApi('GET', `${AGILE_API}/devices/${deviceId}`, null, registeredDeviceSchema)
export const registeredDevicesFetch = () => callApi('GET', `${AGILE_API}/devices`, null, registeredDeviceSchemaArray)
export const devicesFetch = () => callApi('GET', `${AGILE_API}/protocols/devices`, null, deviceSchemaArray)
export const deviceDelete = deviceId => callApi('DELETE', `${AGILE_API}/devices/${deviceId}`)
export const deviceRegister = device => callApi('POST', `${AGILE_API}/devices/register`, device, registeredDeviceSchema)
export const deviceConnect = deviceId => callApi('POST', `${AGILE_API}/device/${deviceId}/connection`, deviceId, registeredDeviceSchema)
export const deviceTypeof = device => callApi('POST', `${AGILE_API}/devices/typeof`, device)

// settings
export const protocolsFetch = () => callApi('GET', `${AGILE_API}/protocols`, null, protocolsSchemaArray)
export const discoveryOn = () => callApi('POST', `${AGILE_API}/protocols/discovery`)
export const discoveryOff = () => callApi('DELETE', `${AGILE_API}/protocols/discovery`)
