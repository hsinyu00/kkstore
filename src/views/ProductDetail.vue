<template>
  <div class="product-detail">

  </div>
</template>

<script>
export default {

};
</script>

<style lang='scss' scoped>
.product-detail {
  display: flex;
  .product-image {
    flex: 0 1 40%;
    img {
      width: 100%;
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
