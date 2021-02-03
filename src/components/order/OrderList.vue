<template>
  <ul class="cart__orders">
    <OrderItem v-for="product in products" :key="product.product.id" :product="product"/>
  </ul>
</template>

<script>
import OrderItem from "@/components/order/OrderItem";

export default {
  props: ['products'],
  components: {OrderItem}
}
</script>