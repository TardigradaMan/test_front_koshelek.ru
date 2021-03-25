import axios from 'axios'

const BASE_URL = 'https://api.binance.com'
axios.defaults.baseURL = BASE_URL

export const getData = (symbol) => {
  return axios.get(`/api/v3/depth?symbol=${symbol}`)
}
