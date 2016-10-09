import { DEVICE_API } from '../constants/Endpoints'
import io from 'socket.io-client'

export const websocketMiddleware = (store) => {

    var s = io()

    s.on('agile_connect',  () => {
      store.dispatch({
        type: 'SOCKET_CONNECTION',
        result: event.data
      })
		})

    s.on('agile_message', (message) => {
      store.dispatch({
        type: 'SOCKET_MESSAGE',
        result: message
      })
    })

    s.on('agile_error', (error) => {
      store.dispatch({
        type: 'SOCKET_ERROR',
        result: error
      })
    })
}
