import { DEVICE_API } from '../constants/Endpoints'
import axios from 'axios'
export const websocketMiddleware = (store) => {

  // axios.get(`${DEVICE_API}/ws`).then(function (response) {
    const ws = new WebSocket('ws://localhost:8081')
    ws.onopen = event => {
      store.dispatch({
        type: 'SOCKET_CONNECTION',
        result: event.data
      })
    }

    ws.onmessage = event => {
      store.dispatch({
        type: 'SOCKET_MESSAGE',
        result: JSON.parse(event.data)
      })
    }

    ws.onerror = event => {
      store.dispatch({
        type: 'SOCKET_ERROR',
        result: event.data
      })
    }
}
