<template>
  <h3 class="toggle__title">Выберети валюту</h3>
  <div class="toggle__wrapper">
    <!-- <select class="select" v-model="selectedSymbol">
    <option v-for="(item, index) in symbols" :key="index">
      {{ item }}
    </option>
  </select> -->
    <div class="toggle">
      <div class="toggle__symbol">
        <h3>Выбранная валюта:</h3>
        <span>{{ selectedSymbol }}</span>
      </div>
      <div class="toggle__list">
        <button class="toggle__btn" @click="toggleSymbol">Список валют</button>
        <ul
          class="toggle__drop-list"
          v-if="showListTickers"
          @click="selectTicker"
        >
          <li
            class="toggle__drop-item"
            v-for="(item, index) in symbols"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <CurrencyListSelected class="history" />
    </div>
  </div>
</template>

<script>
import {inject, ref, reactive, watch} from 'vue'
import CurrencyListSelected from './CurrencyListSelected.vue'

export default {
  components: {CurrencyListSelected},
  setup() {
    const emitter = inject('emitter')
    const selectedSymbol = ref('BTCUSDT')
    const symbols = reactive(['BTCUSDT', 'BNBBTC', 'ETHBTC'])

    const showListTickers = ref(false)
    const toggleSymbol = () => (showListTickers.value = !showListTickers.value)
    const selectTicker = (event) => {
      selectedSymbol.value = event.target.innerText
      showListTickers.value = false
    }

    watch(
      () => selectedSymbol.value,
      () => {
        emitter.emit('symbol', selectedSymbol.value)
      }
    )

    return {
      selectedSymbol,
      symbols,
      showListTickers,
      toggleSymbol,
      selectTicker,
    }
  },
}
</script>

<style lang="scss" scoped>
.toggle__wrapper {
}
.toggle {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(150px, auto);
  grid-template-areas: 'symbol list history';
  gap: 10px;
  justify-items: center;

  margin: 0 auto;
  padding: 0 20px;
  color: $text-color;

  @include lg_1024 {
    grid-template-columns: 2fr 1fr;
    // grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'symbol history'
      'list history';

    gap: 70px;
  }

  @include sm_640 {
    grid-template-columns: 1fr;
    // grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'symbol'
      'list'
      'history';
  }

  &__title {
    font-size: 2rem;
    color: $text-color;
    margin: 0;
    text-align: center;
    padding-bottom: 20px;
  }

  &__symbol {
    position: relative;
    grid-area: symbol;

    & > h3 {
      font-size: 1.5rem;
      margin: 0;
    }
    & > span {
      position: absolute;
      top: 30px;
      left: 0;
      font-size: 3.1rem;
    }
  }
  &__btn {
    background: rgb(73, 73, 73);
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    color: $text-color;
    font-size: 1.2rem;
    &:hover,
    :focus,
    :active {
      color: $active-color;
      cursor: pointer;
    }
  }

  &__list {
    width: max-content;
    grid-area: list;

    position: relative;
  }
  &__drop-list {
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.788);
    text-align: center;
    border-radius: 5px;

    width: 100%;
    position: absolute;
  }
  &__drop-item {
    padding: 0.6rem 0;
    &:hover,
    :focus,
    :active {
      transform: scale(1.1);
      color: $active-color;
      cursor: pointer;
    }
  }
}

.history {
  grid-area: history;
}
</style>
