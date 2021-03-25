<template>
  <div class="selected">
    <h3 class="selected__title">История просмотренных валют</h3>
    <ul class="selected__list">
      <li
        class="selected__item"
        v-for="(item, index) in listOfChanges"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import {reactive, inject} from 'vue'

export default {
  setup() {
    const listOfChanges = reactive(['BTCUSDT'])
    const emitter = inject('emitter')
    emitter.on('symbol', (symbol) => {
      listOfChanges.push(symbol)
    })

    return {listOfChanges}
  },
}
</script>

<style lang="scss" scoped>
.selected {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    margin-top: 0;
    font-size: 1.5rem;
  }

  &__list {
    box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.788);
    text-align: center;
    border-radius: 5px;
    width: max-content;
    overflow-y: overlay;
    max-height: 200px;

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #242424;
    }

    &::-webkit-scrollbar {
      display: none;
      width: 10px;
      background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: rgb(109, 108, 108);
    }

    &:hover {
      &::-webkit-scrollbar {
        display: block;
        background-color: #353535;
      }
    }
  }
  &__item {
    padding: 0.4rem 2rem;
    color: $text-color;
    &:nth-of-type(odd) {
      background: rgba(0, 0, 0, 0.158);
    }
  }
}
</style>
