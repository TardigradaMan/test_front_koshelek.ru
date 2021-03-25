<template>
  <header class="header">
    <!-- <div>{{ currentSymbol }}</div> -->
    <TheNavigaton
      :list-components="listComponents"
      :current-component="currentComponent"
      @select-component="selectComponent"
    />
  </header>

  <div class="wrapper">
    <main class="container">
      <keep-alive>
        <component :is="selectedComponent"></component>
      </keep-alive>
    </main>
  </div>
</template>
<script>
import {reactive, ref} from '@vue/reactivity'
import {computed, defineAsyncComponent} from '@vue/runtime-core'
import TheNavigaton from './components/TheNavigaton.vue'
export default {
  components: {
    TheNavigaton,
    CurrencyState: defineAsyncComponent(() =>
      import('./components/СurrencyState.vue')
    ),
    CurrencyDiff: defineAsyncComponent(() =>
      import('./components/СurrencyDiff.vue')
    ),
  },
  setup() {
    const listComponents = reactive([
      {nameComponent: 'CurrencyState', nameLink: 'Ticker'},
      {nameComponent: 'CurrencyDiff', nameLink: 'Выбор Ticker'},
    ])
    const currentComponent = ref('CurrencyState')

    // const currentSymbol = inject('currentSymbol', 'BNBBTC')
    // watch(
    //   () => currentComponent.value,
    //   (newValue, oldValue) => {
    //     console.log(newValue, oldValue)
    //   }
    // )

    const selectComponent = (component) => (currentComponent.value = component)
    const selectedComponent = computed(() => currentComponent.value)
    return {
      listComponents,
      currentComponent,
      selectedComponent,
      selectComponent,
    }
  },
}
</script>
<style lang="scss">
#app {
  background: rgb(20, 21, 26);
}
.container {
  height: 100vh;
  padding-top: 100px;
  & .table {
    @include md_768 {
      height: auto;
    }
  }
  @include sm_640 {
    height: auto;
  }
}

.header {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;

  background: rgb(13, 13, 27);
  color: #fff;
}
</style>
