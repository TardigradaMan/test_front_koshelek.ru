<template>
  <div class="wrapper__table">
    <h3 class="table__title"><slot /> - {{ currentSymbol }}</h3>
    <ul class="table__header">
      <li class="table__header-item">Price</li>
      <li class="table__header-item">Ammount</li>
      <li class="table__header-item table__header-item--mobile">Total</li>
    </ul>
    <div class="wrapper__table-body">
      <table class="table">
        <tbody class="table__body">
          <tr class="" v-for="(item, index) in currencyTikers" :key="index">
            <td class="">{{ item[0] }}</td>
            <td class="">{{ item[1] }}</td>
            <td class="table__td--mobile">
              {{ item[0] * item[1] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {inject} from '@vue/runtime-core'

export default {
  props: {
    currencyTikers: {
      type: Array,
      require: false,
    },
  },
  setup() {
    const currentSymbol = inject('currentSymbol', 'BNBBTC')
    return {currentSymbol}
  },
}
</script>

<style lang="scss" scoped>
.wrapper__table {
  width: 100%;
  height: auto;
  margin: 10px;
  box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.788);
}
.wrapper__table-body {
  overflow: auto;
  height: calc(100vh - 250px);

  overflow-y: overlay;

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
.table {
  background-color: rgba(30, 32, 38, 0.498);
  width: 100%;
  border-spacing: 0;
  color: $text-color;
  text-align: center;
  table-layout: fixed;

  &__title {
    margin: 0;
    padding: 0.5em;
    color: $active-color;
    font-size: 1.5rem;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;

    align-items: center;
    justify-items: center;
    border-bottom: thin solid rgba(255, 255, 255, 0.12);

    color: $text-color;
    font-size: 1.2rem;

    @include sm_640 {
      grid-template-columns: 1fr 1fr;
    }

    &-item {
      padding: 0.6rem 0.6rem;
      &--mobile {
        @include sm_640 {
          display: none;
        }
      }
    }
  }

  &__td--mobile {
    @include sm_640 {
      display: none;
    }
  }

  & tr {
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }
}

.table__body {
  font-size: 1rem;
  @include lg_1024 {
    font-size: 0.8rem;
  }

  & > tr:nth-of-type(odd) {
    background: rgba(0, 0, 0, 0.05);
  }
  & > * > * {
    padding: 0.5rem 0.5rem;
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px rgba(0, 0, 0, 0.05);
  }
}
</style>
