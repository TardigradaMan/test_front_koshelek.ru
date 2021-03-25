const WS_URL = 'wss://stream.binance.com:9443'

export const subscribeToTickersWs = (symbol) => {
  const socket = new WebSocket(`${WS_URL}/ws/${symbol.toLowerCase()}@depth`)
  return socket
}
