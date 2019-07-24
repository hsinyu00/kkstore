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

<style lang="scss" scoped>
.product {
  border: 1px solid #ddd;
  padding: 20px;
  .product-image {
    text-align: center;
    img {
      height: 150px;
    }
  }
  .product-name {
    text-align: center;
    margin: 15px 0 0 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .product-price {
    text-align: right;
    font-size: 24px;
    margin: 15px 0 0 0;
  }
}
</style>
