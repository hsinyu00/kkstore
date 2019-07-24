export default {
  namespaced: true,
  state: {
    product: null
  },
  mutations: {
    set (state, product) {
      state.product = product;
    }
  },
  actions: {
    async fetch (context, modelId) {
      let response = await fetch(`http://api-eshop.jaceju.macross7.kk-box.com/products/${modelId}`);
      let data = await response.json();

      context.commit('set', data.data);
    }
  },
  getters: {
    product: (state) => state.product
  }
};
