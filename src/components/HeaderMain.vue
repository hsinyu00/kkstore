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
