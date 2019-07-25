<template>
  <div class="product">
    <div class="product-image">
      <img :src="product.variants[0].image">
    </div>
    <div class="product-info">
      <p class="product-name">
        <router-link :to="'/detail/' + product.model">{{ product.name }}</router-link>
      </p>
      <p class="product-price">NT$ {{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped src="./../assets/product.scss"></style>
