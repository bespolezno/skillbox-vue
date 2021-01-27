<template>
  <li class="catalog__item">
    <RouterLink class="catalog__pic" :to="{name: 'product', params: {id: product.id}}">
      <img :src="product.image" :alt="product.title">
    </RouterLink>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <color-picker :color-ids="product.colorIds" class="colors--black"/>
  </li>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {ColorPicker},
  props: ['product'],
  name: "ProductItem",
  filters: {
    numberFormat
  }
}
</script>