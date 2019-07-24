import Vue from 'vue';
import Vuex from 'vuex';
import Products from './stores/products';
import Product from './stores/product';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Products,
    Product
  }
});
