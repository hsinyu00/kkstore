export default {
  namespaced: true,
  state: {
    cart: []
  },
  mutations: {
    set (state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    async addItem (context, productId) {
      let user = context.rootGetters['User/user'];

      if (!user) {
        throw new Error('沒有登入');
      }

      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/cart', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify({ product_id: productId })
      });

      context.dispatch('fetch');

      return response.ok;
    },
    async removeItem (context, itemId) {
      let user = context.rootGetters['User/user'];

      if (!user) {
        throw new Error('沒有登入');
      }

      let response = await fetch(`http://api-eshop.jaceju.macross7.kk-box.com/cart/${itemId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + user.token
        }
      });

      return response.ok;
    },
    async fetch (context) {
      let user = context.rootGetters['User/user'];

      if (!user) {
        throw new Error('沒有登入');
      }

      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/cart', {
        method: 'GET',
        headers: {
          'authorization': 'Bearer ' + user.token
        }
      });

      let data = await response.json();

      context.commit('set', data.data);
    }
  },
  getters: {
    items: (state) => state.cart,
    count: (state) => {
      return state.cart.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);
    }
  }
};
