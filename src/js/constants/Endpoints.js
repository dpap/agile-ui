let BASE_API = 'http://192.168.0.35:8080/api'
let DEVICE_API = 'http://217.77.95.110:8080/resin'

if (process.env.NODE_ENV === 'production') {
  BASE_API = '/api'
  DEVICE_API = '/resin'
}

export { BASE_API, DEVICE_API }
