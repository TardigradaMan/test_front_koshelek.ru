<template>
  <section class="table">
    <div v-if="loading">Loading...</div>
    <template v-if="tickers.bids">
      <currency-table :currencyTikers="tickers.bids">Bids</currency-table>
      <currency-table :currencyTikers="tickers.asks">Asks</currency-table>
    </template>
  </section>
</template>

<script>
import CurrencyTable from './СurrencyTable.vue'
import {inject, reactive, ref, onBeforeUnmount, provide} from 'vue'

export default {
  components: {CurrencyTable},
  setup() {
    const tickers = reactive({
      bids: null,
      asks: null,
      lastUpdateId: null,
    })
    const ws = ref(null)
    const currentSymbol = ref('BTCUSDT')
    const loading = ref(false)

    provide('currentSymbol', currentSymbol) // тут не работает

    const sdk = inject('sdk')
    const emitter = inject('emitter')

    // Получения первоначального списка по RestApi c выбранным symbols
    const getDataBySymbol = async () => {
      loading.value = true
      const {data} = await sdk.get(currentSymbol.value)
      loading.value = false
      tickers.asks = data.asks
      tickers.bids = data.bids
      tickers.lastUpdateId = data.lastUpdateId
    }

    const subscribeToTickersWs = () => {
      ws.value = sdk.subscribeWs(currentSymbol.value)
      ws.value.onmessage = (event) => {
        const {u, U, a, b} = JSON.parse(event.data)
        if (U <= tickers.lastUpdateId + 1 || u >= tickers.lastUpdateId + 1) {
          const newAsks = a.filter((item) => item[1] != 0)
          const newBids = b.filter((item) => item[1] != 0)

          tickers.asks = [
            ...newAsks,
            ...tickers.asks.slice(0, tickers.asks.length - newAsks.length),
          ]

          tickers.bids = [
            ...newBids,
            ...tickers.bids.slice(0, tickers.bids.length - newBids.length),
          ]
        }
      }
    }

    // Подписка на изменение выбранного symbol
    const subscriptionToTickers = () => {
      subscribeToTickersWs()
      getDataBySymbol()

      emitter.on('symbol', (symbol) => {
        currentSymbol.value = symbol
        ws.value.close()
        subscribeToTickersWs()
        getDataBySymbol()
      })
    }

    subscriptionToTickers()

    onBeforeUnmount(() => {
      emitter.all.clear()
    })

    return {
      tickers,
      loading,
    }
  },
}
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  @include lg_1024 {
    padding: 0 20px;
  }
  @include md_768 {
    flex-direction: column;
  }
}
</style>
