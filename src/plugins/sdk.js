import {getData} from '../api/axios'
import {subscribeToTickersWs} from '../api/webSocket'

const sdk = {}

sdk.get = getData
sdk.subscribeWs = subscribeToTickersWs

export default sdk
