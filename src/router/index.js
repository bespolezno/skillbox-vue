import VueRouter from "vue-router";
import Vue from "vue";
import MainPage from "@/pages/MainPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";

Vue.use(VueRouter)

const routes = [
    {name: 'main', component: MainPage, path: '/'},
    {name: 'cart', component: CartPage, path: '/cart'},
    {name: 'product', component: ProductPage, path: '/product/:id'},
    {name: 'notFound', component: NotFoundPage, path: '*'},
];

const router = new VueRouter({
    routes
});

export default router;