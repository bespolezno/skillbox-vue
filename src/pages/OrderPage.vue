<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <RouterLink class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </RouterLink>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
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
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" placeholder="Введите ваше полное имя" title="ФИО" />
            <BaseFormText v-model="formData.address" :error="formError.address" placeholder="Введите ваш адрес" title="Адрес доставки" />
            <BaseFormText v-model="formData.phone" :error="formError.phone" type="tel" placeholder="Введите ваш телефон" title="Телефон" />
            <BaseFormText v-model="formData.email" :error="formError.email" type="email" placeholder="Введи ваш Email" title="Email" />
            <BaseFormTextArea v-model="formData.comment" :error="formError.comment" placeholder="Ваши пожелания" title="Комментарий к заказу" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderList :products="cartDetailProducts"/>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ cartTotalAmount }}</b> товара на сумму <b>{{ cartTotalPrice | numberFormat }} ₽</b></p>
          </div>

          <BaseLoader v-if="cartLoading" style="margin-top: 20px;" background="#9eff00"/>
          <button v-else class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>{{ formErrorMessage }}</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import {mapGetters} from "vuex";
import numberFormat from "@/helpers/numberFormat";
import BaseFormText from "@/components/common/BaseFormText";
import BaseLoader from "@/components/common/BaseLoader";
import BaseFormTextArea from "@/components/common/BaseFormTextArea";
import OrderList from "@/components/order/OrderList";
import {API_BASE_URL} from "@/config";
import axios from "axios";

export default {
  components: {
    OrderList,
    BaseFormText,
    BaseFormTextArea,
    BaseLoader
  },
  data: () => ({
    formData: {},
    formError: {},
    formErrorMessage: "",
    cartLoading: false
  }),
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartTotalAmount'])
  },
  methods: {
    async order() {
      this.formError = {};
      this.formErrorMessage = "";
      this.cartLoading = true;

      try {
        const response = await axios.post(API_BASE_URL + 'orders', {...this.formData}, {
          params: {
            userAccessKey: this.$store.state.userAccessKey
          }
        });
        this.$store.commit('resetCart');
        this.$store.commit('updateOrderInfo', response.data);
        this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
      } catch (error) {
        this.formError = error.response.data.error.request ?? {};
        this.formErrorMessage = error.response.data.error.message ?? "";
      } finally {
        this.cartLoading = false;
      }
    }
  },
  filters: {numberFormat}
}
</script>