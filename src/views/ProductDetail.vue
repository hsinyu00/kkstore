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

<style lang='scss' scoped>
.product-detail {
  display: flex;
  margin-top: 40px;
  .product-image {
    flex: 0 1 40%;
    text-align: center;
    img {
      display: inline-block;
      width: 80%;
    }
  }
  .product-info {
    margin-left: 40px;
  }
  .product-price {
    font-size: 24px;
  }
}

.variant-selector {
  list-style: none;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px 0 0;
  }
}

// 如果元素同時有 btn 和 active 兩個 class 的話，
// 套用這個樣式：
.btn.active {
  background: #00aed8;
  color: #fff;
}
</style>
