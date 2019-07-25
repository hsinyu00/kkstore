<template>
  <div class="product-detail" v-if="product">
    <div class="product-image">
      <img :src="image" />
    </div>
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <h2>顏色</h2>
      <ul class="variant-selector">
        <li v-for="(variant, index) in product.variants" :key="variant.id">
          <button
            class="btn"
            :class="{ active: selected === index }"
            @click="handleClick(index)">{{ variant.variant }}</button>
        </li>
      </ul>
      <h2>售價</h2>
      <p class="product-price">$ {{ product.price }}</p>

      <button class="btn btn-primary" @click="addToCart">加入購物車</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      selected: 0
    };
  },
  mounted () {
    this.$store.dispatch('Product/fetch', this.id);
  },
  methods: {
    handleClick (index) {
      this.selected = index;
    },
    addToCart () {
      this.$store.dispatch('Cart/addItem', this.product.variants[this.selected].id);
    }
  },
  computed: {
    image () {
      return this.product.variants[this.selected].image;
    },
    ...mapGetters({
      product: 'Product/product'
    })
  }
};
</script>

<style lang='scss' scoped src="./../assets/product-detail.scss"></style>
