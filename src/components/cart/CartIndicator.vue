<template>
  <RouterLink class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров" v-if="$store.state.cartLoading">Загрузка</span>
    <span class="header__count" aria-label="Количество товаров" v-else>{{ $store.getters.cartTotalAmount }}</span>
  </RouterLink>
</template>

<script>
export default {
  name: 'CartIndicator'
}
</script>