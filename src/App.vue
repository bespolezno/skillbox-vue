<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>
      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>

import ProductList from "@/components/ProductList";
import products from "@/data/products";
import BasePagination from "@/components/BasePagination";
import ProductFilter from "@/components/ProductFilter";

export default {
  name: 'App',
  components: {
    BasePagination,
    ProductList,
    ProductFilter
  },
  data: () => ({
    page: 1,
    productsPerPage: 3,
    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterCategoryId: 0,
    filterColorId: 0
  }),
  watch: {
    filteredProducts() {
      this.page = 1;
    }
  },
  computed: {
    filteredProducts() {
      const {filterPriceFrom, filterPriceTo, filterCategoryId, filterColorId} = this;
      let filtered = products;

      if (filterPriceFrom > 0) {
        filtered = filtered.filter(product => product.price > filterPriceFrom)
      }

      if (filterPriceTo > 0) {
        filtered = filtered.filter(product => product.price < filterPriceTo)
      }

      if (filterCategoryId) {
        filtered = filtered.filter(product => product.categoryId === filterCategoryId)
      }

      if (filterColorId) {
        filtered = filtered.filter(product => product.colorIds.includes(filterColorId))
      }

      return filtered;
    },
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
    productsCount() {
      return this.filteredProducts.length;
    }
  }
}
</script>

<style>
</style>
