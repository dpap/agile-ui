import { WS_API } from '../constants/Endpoints'

export const websocketMiddleware = (store) => {
  const ws = new WebSocket(WS_API, 'echo-protocol')

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
