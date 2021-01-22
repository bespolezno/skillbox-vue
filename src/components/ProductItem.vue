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

    <ul class="colors colors--black">
      <li class="colors__item" v-for="colorId in product.colorIds" :key="colorId.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="getColor(colorId).code" checked>
          <span class="colors__value" :style="{backgroundColor: getColor(colorId).code}"></span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import colors from "@/data/colors";

export default {
  props: ['product'],
  name: "ProductItem",
  methods: {
    getColor(id) {
      return colors.find(el => el.id === id);
    }
  }
}
</script>