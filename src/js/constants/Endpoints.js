let BASE_API = 'http://217.77.95.110:8080/api'
let DEVICE_API = 'http://217.77.95.110:8080/resin'
let WS_API // TODO sort out websockets when in dev mode

if (process.env.NODE_ENV === 'production') {
  BASE_API = '/api'
  DEVICE_API = '/resin'
}

export { BASE_API, DEVICE_API, WS_API }
