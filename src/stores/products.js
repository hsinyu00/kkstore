export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    set (state, products) {
      state.products = products;
    }
  },
  actions: {
    async fetch (context) {
      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/products');
      let data = await response.json();

      context.commit('set', data.data);
    }
  },
  getters: {
    all: state => state.products
  }
};
