import { Schema, arrayOf } from 'normalizr'


// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.
// Read more about Normalizr: https://github.com/gaearon/normalizr

const registeredDeviceSchema = new Schema('registeredDevices', {
  idAttribute: 'deviceId'
})

const registeredDeviceSchemaArray = arrayOf(registeredDeviceSchema)

const deviceSchema = new Schema('devices', {
  idAttribute: 'id'
})
const deviceSchemaArray = arrayOf(deviceSchema)

const protocolsSchema = new Schema('protocols', {
  idAttribute: 'id'
})
const protocolsSchemaArray = arrayOf(protocolsSchema)

export { registeredDeviceSchema, registeredDeviceSchemaArray, deviceSchema, deviceSchemaArray,  protocolsSchema, protocolsSchemaArray }
