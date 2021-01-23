<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#">
      <img :src="product.image" :alt="product.title">
    </a>

    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>

    <span class="catalog__price">
      {{ product.price }} ₽
    </span>

    <color-picker :color-ids="product.colorIds" :black="true"/>
  </li>
</template>

<script>
import ColorPicker from "@/components/ColorPicker";

export default {
  components: {ColorPicker},
  props: ['product'],
  name: "ProductItem"
}
</script>