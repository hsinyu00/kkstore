<template>
  <div id="app">
    <header-main />
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import HeaderMain from './components/HeaderMain';

export default {
  components: {
    HeaderMain
  }
};
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

*, *::before, *::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

button {
  &.btn {
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 10px 20px;
    font-size: 14px;
  }
  &.btn-primary {
    background-color: #00aed8;
    color: #fff;
  }
}

img {
  max-width: 100%;
  width: auto;
}

.container {
  min-width: 700px;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
