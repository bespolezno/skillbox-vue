import Vue from "vue";
import Vuex from "vuex"
import axios from "axios";
import {API_BASE_URL} from "@/config";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        cartProducts: [],
        userAccessKey: null,
        cartProductsData: [],
        cartLoading: false,
        orderInfo: null
    },
    mutations: {
        updateOrderInfo(state, orderInfo) {
            state.orderInfo = orderInfo;
        },
        resetCart(state) {
            state.cartProducts = [];
            state.cartProductsData = [];
        },
        updateCartProductAmount(state, {productId, amount}) {
            const item = state.cartProducts.find(el => el.productId === productId);

            if (item) {
                item.amount = amount;
            }
        },
        deleteCartProduct(state, productId) {
            state.cartProducts = state.cartProducts.filter(el => el.productId !== productId);
        },
        updateUserAccessKey(state, accessKey) {
            state.userAccessKey = accessKey;
        },
        updateCartProductsData(state, items) {
            state.cartProductsData = items;
        },
        syncCartProducts(state) {
            state.cartProducts = state.cartProductsData.map(el => ({
                productId: el.product.id,
                amount: el.quantity
            }))
        }
    },
    getters: {
        cartDetailProducts(state) {
            return state.cartProducts.map(el => {
                const product = state.cartProductsData.find(p => p.product.id === el.productId).product;

                return {
                    ...el,
                    product: {
                        ...product,
                        image: product.image.file.url
                    }
                }
            });
        },
        cartTotalPrice(state, getters) {
            return getters.cartDetailProducts.reduce((acc, item) => (item.amount * item.product.price) + acc, 0);
        },
        cartTotalAmount(state) {
            return state.cartProducts
                .map(el => el.amount)
                .reduce((a, b) => a + b, 0);
        }
    },
    actions: {
        async loadOrderInfo(context, {orderId, errCallback}) {
            try {
                const response = await axios.get(API_BASE_URL + 'orders/' + orderId, {
                    params: {userAccessKey: context.state.userAccessKey}
                });
                context.commit('updateOrderInfo', response.data);
            } catch (error) {
                errCallback(error);
            }
        },
        async loadCart(context) {
            context.state.cartLoading = true;
            const response = await axios.get(API_BASE_URL + 'baskets', {
                params: {userAccessKey: context.state.userAccessKey}
            });

            if (!context.state.userAccessKey) {
                localStorage.setItem('userAccessKey', response.data.user.accessKey);
                context.commit('updateUserAccessKey', response.data.user.accessKey);
            }

            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');

            context.state.cartLoading = false;
        },
        async addProductToCart(context, {productId, amount}) {
            const response = await axios.post(API_BASE_URL + 'baskets/products', {
                productId,
                quantity: amount
            }, {
                params: {userAccessKey: context.state.userAccessKey}
            });

            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
        },
        async updateCartProductAmount(context, {productId, amount}) {
            this.commit('updateCartProductAmount', {productId, amount});

            if (amount < 1) return;

            try {
                const response = await axios.put(API_BASE_URL + 'baskets/products', {
                    productId,
                    quantity: amount
                }, {
                    params: {userAccessKey: context.state.userAccessKey}
                });

                context.commit('updateCartProductsData', response.data.items);
            } catch {
                context.commit('syncCartProducts');
            }
        },
        async deleteCartProduct(context, productId) {
            this.commit('deleteCartProduct', productId);

            try {
                const response = await axios.delete(API_BASE_URL + 'baskets/products', {
                    params: {userAccessKey: context.state.userAccessKey},
                    data: {productId}
                });

                context.commit('updateCartProductsData', response.data.items);
            } catch {
                context.commit('syncCartProducts');
            }
        }
    }
});