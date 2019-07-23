# 講簡報

# WorkShop 注意事項

1. CSS 不在這次的學習範圍，所以我會先提供寫好的。同學只要使用指定的 class name 即可。
2. 寫久了，很多東西會視為理所當然。對於我的作法不理解時，請同學多問「為什麼？」

# 下載空專案

# 簡述專案目錄結構

- main.js 程式進入點
- router.js 路由定義
- App.js 根元件
- views/* 「頁面」元件
- components/* 其他元件

# 產品介紹頁

1. 打開 `view/ProductDetail.vue`
2. 這是我們的產品介紹頁
3. 這是一個元件。元件分成三個部分：1. 樣板 2. 模型 與 3. 樣式
4. 靜態 HTML: `<h1>Hello World</h1>` (在瀏覽器上檢視結果)
5. 一開始有提到 Vue.js 的功能之一「將 *狀態* 轉變成看得見的 *使用者介面*」
6. 透過 `data` 欄位來定義狀態。
  1. `data` 是一個函式，而不是一個字面物件。
  2. 這個函式回傳一個物件，這個物件就是這個元件的 *狀態初始值*。
  3. 列在這邊的屬性，Vue.js 也會加上 hook，方便監聽他們的變動。所以動態新增的屬性 Vue.js 無法得知他的變動，來更新畫面。
  4. 這邊之所以不使用物件常數，是因為如果 `data` 是字面物件。當這個元件被使用多次時，每個實體會關聯到同一個物件。這會產生非預期的資料連動。
7. 我們試著加上：

```js
data (): {
  return {
    product: {
      name: 'iPhone'
    }
  };
}
```

8. 把樣板改成 `<h1>{{ product.name }}</h1>` (在瀏覽器上檢視結果)
9. 把基本樣板補完 (預先寫好了一些 CSS 幫助我們排版，但是我們得補上一些元素)：

```html
<div class="product-info">
  <div class="product-image">
  </div>
  <div class="product-info">
    <h1>{{ product.name }}</h1>
  </div>
</div>
```

10. 我們學會了如何在畫面上呈現一段文字。但是如果要動態的設定 HTML 的屬性呢？
11. 加上

```js
data () {
  return {
    product: {
      name: 'iPhone',
      image: 'https://bit.ly/2LvJCYh'
    }
  }
}
```

12. 要動態的設定 HTML 屬性，要使用 `v-bind` 語法：

```html
<img src="https://bit.ly/2LvJCYh" />
```

成為：

```html
<img v-bind:src="product.image" />
```

或使用縮寫：

```html
<img :src="product.image" />
```

13. 一以貫之的使用縮寫，可以讓你的 code 更好讀。
14. `v-bind` 和大括號裡面，其實我們寫的是一個 JS 表達式。
  1. 表達式：一段 JS Code，執行完你會得到 *一個值*。
  2. `if (ok) { return 'good' }` 不是一個表達式，改用 `ok ? 'hello' : ''`
15. 接下來我們要來讓使用者可以選擇他喜歡的顏色。（請複製 *snippet_1.txt* 到 `data()`)
16. 我們的 `variants` 是個陣列，我們要把他 render 成一個列表，要用 `v-for` 語法。
17. `v-for` 比較特殊，他裡面不是隨便放一個 JS 表達式，而是有特別的語法。
18. 基本的用法是 `v-for="item in list"`，如果你要取得索引編號，可以改寫成 `v-for="(item, index) in list"`。
19. 因為 Vue 使用的效能優化機制，必須要搭配一個 `key` 屬性。（給他一個 unique Id，此處使用 index)
  1. <<<補上原因>>>
20. 寫 template:

```html
<h2>顏色</h2>
<ul class="variant-selector">
  <li v-for="(variant, index) in product.variants" :key="variant.id">
    <button class="btn">{{ variant.variant }}</button>
  </li>
</ul>
```

21. 接下來，我們需要記錄下來使用者選擇了哪個。

```js
data() {
  return {
    selected: 0, // 紀錄使用者選了陣列的第幾項 (index)
    ...略
  }
}
```

22. 當使用者按下按鈕時，我們要把那顆按鈕的代表的 `index` 更新到 `this.selected` 裡面。
23. 綁定事件，我們可以透過 `v-on:` 語法，或是縮寫 `@` 來監聽事件，並指定要接受事件的 handler。

```html
<button v-on:click="handleClick(index)">藍色</button>
```

```html
<button @click="handleClick(index)">藍色</button>
```

24. Handler 是一個方法，我們可以定義在 `methods: {}` 這個區段裡面。

```js
methods: {
  handleClick (index) {
    this.selected = index;
  }
}
```

25. 但是按鈕沒有任何的改變，使用者怎樣知道這個按鈕被選取了呢？所以我們要讓被選取的按鈕變個顏色。
26. (回到簡報)
27. 我已經事先寫好了相關的 CSS，我們只要在 <button> 上面加上 `active` 類別，他就會變色。

```html
<button :class="{ active: selected === index }">...</button>
```

28. 接下來，我們希望產品圖片，能夠跟著我們的選擇改變。我們會用到 Vue.js 提供的 Computed Property 功能。
29. 很多時候，我們需要的資料是需要動態算出來的。

```html
<img :src="productImage" />
```

```js
computed: {
  productImage () {
    return this.product.variants[this.selected].image;
  }
}
```

30. 我們在戳 computed 時，不需要加上 `()`
31. 把金額寫上去：

```html
<h2>售價</h2>
<p class="product-price">{{ product.price }}</p>
```
