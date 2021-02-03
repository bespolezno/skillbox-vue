<template>
  <li class="cart__order">
    <h3>{{ product.product.title }}</h3>
    <b>{{ product.product.price | numberFormat }} ₽ x {{ amount }}</b>
    <span>Артикул: {{ product.product.id }}</span>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";

export default {
  props: ['product'],
  filters: {numberFormat},
  computed: {
    amount() {
      return this.product.amount ?? this.product.quantity;
    }
  }
}
</script>