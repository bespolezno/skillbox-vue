<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ productsCount }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
                     :category-id.sync="filterCategoryId" :color-id.sync="filterColorId"/>
      <section class="catalog">
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузке товаров <button @click.prevent="loadProducts">Попробовать ещё раз</button></div>
        <BaseLoader v-if="productsLoading" />
        <ProductList v-else :products="products"/>
        <BasePagination v-model="page" :count="productsCount" :per-page="productsPerPage"/>
      </section>
    </div>
  </main>
</template>

<script>

import BasePagination from "@/components/common/BasePagination";
import ProductList from "@/components/product/ProductList";
import ProductFilter from "@/components/product/ProductFilter";
import axios from "axios";
import {API_BASE_URL} from "@/config";
import BaseLoader from "@/components/common/BaseLoader";

export default {
  name: 'MainPage',
  components: {
    BasePagination,
    ProductList,
    ProductFilter,
    BaseLoader
  },
  data: () => ({
    page: 1,
    productsPerPage: 3,
    filterPriceFrom: 0,
    filterPriceTo: 0,
    filterCategoryId: 0,
    filterColorId: 0,
    productsData: null,
    productsLoading: false,
    productsLoadingFailed: false,
  }),
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.page = 1;
      this.loadProducts();
    },
    filterColorId() {
      this.page = 1;
      this.loadProducts();
    },
    filterPriceFrom() {
      this.page = 1;
      this.loadProducts();
    },
    filterPriceTo() {
      this.page = 1;
      this.loadProducts();
    }
  },
  computed: {
    products() {
      return this.productsData?.items.map(product => ({
        ...product,
        image: product.image.file.url
      })) ?? [];
    },
    productsCount() {
      return this.productsData?.pagination.total ?? 0;
    }
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;

      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(async () => {
        try {
          const response = await axios.get(API_BASE_URL + 'products', {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filterColorId,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            }
          });
          this.productsData = response.data;
        } catch {
          this.productsLoadingFailed = true;
        } finally {
          this.productsLoading = false;
        }
      }, 0);
    }
  },
  created() {
    this.loadProducts();
  }
}
</script>