import Vue from 'vue';
import Vuex from 'vuex';
import Products from './stores/product';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Products
  }
});
