export default {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    set (state, user) {
      state.user = user;
    },
    clear (state) {
      state.user = null;
    }
  },
  actions: {
    async login (context, payload) {
      let email = payload.email;
      let password = payload.password;

      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('fail');
      }

      let data = await response.json();

      context.commit('set', data.data);
      localStorage.setItem('kks::login', JSON.stringify(data.data));
      context.dispatch('Cart/fetch', null, { root: true });
    },
    restore (context) {
      let stored = localStorage.getItem('kks::login');

      if (stored) {
        context.commit('set', JSON.parse(stored));
        context.dispatch('Cart/fetch', null, { root: true });
      }
    },
    logout (context) {
      context.commit('clear');
      localStorage.removeItem('kks::login');
    }
  },
  getters: {
    user: (state) => state.user
  }
};
