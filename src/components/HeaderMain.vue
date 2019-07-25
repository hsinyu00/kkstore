<template>
  <header class="main">
    <h1>KKStore</h1>
    <nav>
      <ul>
        <template v-if="user">
        <li><router-link :to="{ name: 'cart' }">購物車</router-link><span class="badge">{{cartCount}}</span></li>
        <li>{{ user.email }}</li>
        <li><a href="#" @click.prevent="handleLogout">登出</a></li>
        </template>
        <li v-else><router-link :to="{ name: 'login' }">登入</router-link></li>
        <li><router-link :to="{ name: 'home' }">回首頁</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      user: 'User/user',
      cartCount: 'Cart/count'
    })
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('User/logout');
    }
  }
};
</script>

<style lang="scss" scoped>
header.main {
  display: flex;
  width: 100%;
  height: 50px;
  background-color: #00aed8;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: #fff;
    margin: 0;
  }
  nav {
    ul {
      display: flex;
      align-items: center;
      padding: 0;
      list-style: none;
      margin: 0;
    }
    li {
      margin-left: 1rem;
    }
    a {
      color: #fff;
    }
  }
  .badge {
    display: inline-block;
    background-color: crimson;
    border-radius: 10px;
    padding: 2px 10px;
    font-size: 12px;
    color: #fff;
    margin-left: 5px;
  }
}
</style>
