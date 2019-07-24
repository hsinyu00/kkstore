<template>
  <div class="home">
    <ul class="product-list">
      <li v-for="product in products" :key="product.model">
        <product :product="product" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Product from './../components/Product';

export default {
  mounted () {
    this.$store.dispatch('Products/fetch');
  },
  computed: {
    ...mapGetters({
      products: 'Products/all'
    })
  },
  components: {
    Product
  }
};
</script>

<style lang="scss" scoped>
.product-list {
  padding: 0;
  list-style: none;
  li {
    float: left;
    padding: 0 20px;
    margin-bottom: 20px;
    overflow: hidden;
    width: 25%;
  }
}
</style>
