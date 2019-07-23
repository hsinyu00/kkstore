<template>
  <header class="main">
    <h1>KKStore</h1>
    <nav>
      <ul>
        <li><router-link :to="{ name: 'home' }">回首頁</router-link></li>
      </ul>

    </nav>
  </header>
</template>

<script>
export default {

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
      padding: 0;
      list-style: none;
    }
    li {
      margin-left: 1rem;
    }
  }
}
</style>
