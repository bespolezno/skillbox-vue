import Vue from "vue";
import Vuex from "vuex"
import products from "@/data/products";

Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        cartProducts: [
            {productId: 1, amount: 2},
            {productId: 6, amount: 1},
            {productId: 3, amount: 4},
        ]
    },
    mutations: {
        addProductToCart(state, {productId, amount}) {
            const item = state.cartProducts.find(el => el.productId === productId);

            if (item) {
                item.amount += amount;
            } else {
                state.cartProducts.push({
                    productId,
                    amount
                })
            }
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(el => el.productId === productId);

            if (item) {
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(el => el.productId !== productId);
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(el => ({
                ...el,
                product: products.find(product => product.id === el.productId)
            }));
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.amount * item.product.price) + acc, 0);
        },
        cartTotalAmount(state) {
            return state.cartProducts
                .map(el => el.amount)
                .reduce((a, b) => a + b, 0);
        }
    }
});