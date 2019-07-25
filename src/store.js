import Vue from 'vue';
import Vuex from 'vuex';
import Products from './stores/products';
import Product from './stores/product';
import User from './stores/user';
import Cart from './stores/cart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Products,
    Product,
    User,
    Cart
  }
});
