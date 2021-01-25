<template>
  <Component :is="currentPageComponent" :pageParams="currentPageParams"/>
</template>

<script>

import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import eventBus from "@/eventBus";

const routes = {
  main: MainPage,
  product: ProductPage
}

export default {
  name: 'App',
  components: {},
  data: () => ({
    currentPage: 'main',
    currentPageParams: {}
  }),
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] ?? NotFoundPage;
    }
  },
  methods: {
    gotoPage(pageName, pageParams = {}) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams
    }
  },
  created() {
    eventBus.$on('gotoPage', this.gotoPage.bind(this))
  }
}
</script>

<style>
</style>
