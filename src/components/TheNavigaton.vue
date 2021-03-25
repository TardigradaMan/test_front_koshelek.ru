<template>
  <nav class="nav">
    <ul class="nav__list">
      <button
        v-for="(component, index) in listComponents"
        :key="index"
        :class="[
          'nav__link',
          {'nav__link--active': currentComponent === component.nameComponent},
        ]"
        @click="selectPage(component.nameComponent)"
      >
        {{ component.nameLink }}
      </button>
      <li class="nav__link">
        <a
          class="nav__link"
          href="https://github.com/binance/binance-spot-api-docs"
          >Api
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    listComponents: {
      type: Array,
      required: true,
    },
    currentComponent: {
      type: String,
      required: true,
    },
  },
  emits: ['select-component'],
  setup(_, {emit}) {
    return {
      selectPage: (component) => emit('select-component', component),
    }
  },
}
</script>

<style lang="scss" scoped>
.nav {
  &__list {
    display: flex;
  }
  &__link {
    padding-left: 15px;
    color: #fff;
    text-decoration: none;

    background: none;
    outline: none;
    border: none;

    cursor: pointer;

    &:hover,
    :focus {
      color: $active-color;
    }

    &--active {
      color: $active-color;
    }
  }
}
</style>
