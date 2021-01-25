<template>
  <li class="catalog__item">
    <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
      <img :src="product.image" :alt="product.title">
    </a>

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
import gotoPage from "@/helpers/gotoPage";
import numberFormat from "@/helpers/numberFormat";

export default {
  components: {ColorPicker},
  props: ['product'],
  name: "ProductItem",
  methods: {
    gotoPage
  },
  filters: {
    numberFormat
  }
}
</script>