<template>
  <div class="cart">
    <h2>購物車內容</h2>
    <div v-if="items.length === 0">
      沒有任何商品
    </div>
    <ol>
      <li v-for="item in items" :key="item.id">
        <div class="product-name">{{ item.product.name }}</div>
        <div class="quantity">{{ item.quantity }} 件</div>
        <div class="action"><a href="#" @click.prevent="removeItem(item.id)">移除</a></div>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  mounted () {
    this.$store.dispatch('Cart/fetch');
  },
  methods: {
    async removeItem (itemId) {
      await this.$store.dispatch('Cart/removeItem', itemId);
      await this.$store.dispatch('Cart/fetch');
    }
  },
  computed: {
    ...mapGetters({
      items: 'Cart/items'
    })
  }
};
</script>

<style lang="scss" scoped src="./../assets/cart.scss"></style>
