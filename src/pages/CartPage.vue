<template>
  <main class="content container" v-if="$store.state.cartLoading"><BaseLoader/></main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ cartTotalAmount }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in cartDetailProducts" :key="item.productId" :item="item"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <RouterLink tag="button" :to="{name: 'order'}" v-if="cartTotalAmount" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </RouterLink>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import {mapGetters} from "vuex";
import CartItem from "@/components/cart/CartItem";
import BaseLoader from "@/components/common/BaseLoader";

export default {
  name: 'CartPage',
  components: {
    CartItem,
    BaseLoader
  },
  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount'])
  }
}
</script>