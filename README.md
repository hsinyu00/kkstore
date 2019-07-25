# 講簡報

# WorkShop 注意事項

1. CSS 不在這次的學習範圍，所以我會先提供寫好的。同學只要使用指定的 class name 即可。
2. 寫久了，很多東西會視為理所當然。對於我的作法不理解時，請同學多問「為什麼？」（雖然我不一定能夠回答就是了)

# 下載空專案

# 簡述專案目錄結構

- main.js 程式進入點
- router.js 路由定義
- App.js 根元件
- views/* 「頁面」元件
- components/* 其他元件

- API 文件：http://api-shop-doc.jaceju.macross7.kk-box.com/api/v1/

# 第一章：產品介紹頁 (Vue Template 基本語法)

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

# 第二章 產品列表頁 Vue 元件

1. 改網址回到首頁 `/`
2. 撰寫基本的產品列表

```html
<ul class="product-list">
  <li v-for="product in products" :key="product.model">
    <div class="product">
      <div class="product-image">
        <img :src="product.variants[0].image">
      </div>
      <div class="product-info">
        <p class="product-name">{{ product.name }}</p>
        <p class="product-price">NT$ {{ product.price }}</p>
      </div>
    </div>
  </li>
</ul>
```

3. 我們可以把一個產品卡包成一個元件，這讓我們列表頁的變得簡單好讀。也讓產品卡的樣式與邏輯可以封裝起來，避免與外部關聯過多。
4. 首先我們建立一個新的 Vue file，叫做 `Product.vue`，放在 `components` 目錄下。
5. 如果我們有安裝 VS Code 擴充：Vuter 的話，可以輸入 `scaffold` (不必輸入完，候選項目出現後，按 Enter) 自動產生一個空的 Vue 元件。
6. 我們把剛剛的 HTML 複製過來
7. 我們不希望元件自己有呼叫 API 的機制，所以他的一切所需都要從上層傳過來。
8. 這時候，我們要透過 props，從剛剛的 `Home.vue` 接受 product 物件。

```js
props: {
  product: {
    type: Object,
    required: true
  }
}
```

9. 我們把 CSS 搬過來
10. 接下來回到 Home，我們要載入剛剛寫好的元件：

```js
import Product from './../components/Product';

...
components: {
  Product
  // Product: Product 的縮寫
}
```

11. 如此一來我們把元件註冊上去了，雖然我們註冊的名稱是 "Product"，但是實際上在使用時，使用的是小寫的 <product>。
12. Vue.js 會把 CamelCase 轉成 kebab-case，以符合 HTML tag name 的習慣。
13. 幫元件取名字時，要小心不要和 HTML 原生的元素衝突，像是 `Button.vue` 就會出問題。
14. 一個避免衝突的好方法，就是一律使用兩或更多個單字作為元件名稱。HTML 原生元素沒有兩個單字的。
15. 把原本 inline 寫的 HTML 替換成剛定義好的元件：

```html
<li v-for="product in products" :key="product.model">
  <product :product="product" />
</li>
```

16. 實作超連結：我們希望按下產品名稱後，可以進到產品資訊頁。
17. 要做到這個，我們要對 vue-router 做一些了解。 (簡報)
18. 在樣板裡面我們可以用 `<router-link>` 元件，並告訴他要去哪裡：

```html
<router-link :to="'/detail/' + product.model">{{ product.name }}</router-link>
```

19. 不過這樣一來，我們把網址格式寫在 code 裡面，到時候這個組網址的程式可能到處都有，這會降低我們的可維護性。(萬一改網址，你要改好多地方)
20. 所以我們有另外一個表達方式。由於我們的每個路由都有取名字，所以我們可以用名字稱呼他。

```html
<router-link :to="{ name: 'detail' }">{{ product.name }}</router-link>
```

21. 但是我們的網址裡面還有產品型號在裡面，我們要透過 `params` 屬性來指派他：

```html
<router-link :to="{ name: 'detail', params: { id: product.model } }">{{ product.name }}</router-link>
```

# 第三章 呼叫 API

1. 到現在為止，我們網頁上呈現的資訊都是寫死在 code 裡面的，在真實世界我們需要呼叫 API 跟其他服務取得資料。
2. 我們通常會使用 Vuex 來幫我們管理取得、保存與更新資料的邏輯。(簡報)
3. 我們創建一個目錄叫 `store`
4. 我們要設計一個 vuex 模組，所以新增一個檔案叫做 `products.js`
5. 寫下一個 vuex 模組的基本架構： (他也不過是一個普通的物件)

```js
export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {

  },
  actions: {

  },
  getters: {

  }
};
```

6. 這個模組，我們要從 API 那邊拿回我們的產品列表，然後保存起來。
7. 我們先回去 Home.vue 那邊把我們本地的資料刪掉。讓他噴錯沒關係。

```diff
- import products from './../../snippets/products';
  import Product from './../components/Product';

  export default {
-   data () {
-     return {
-       products: products
-     };
-   },
```

8. 打開 API 文件，我們知道如果要取得產品列表，我們要對 `http://api-eshop.jaceju.macross7.kk-box.com/products` 發送 GET 請求。
9. 我們在 `actions` 區段新增一個方法：

```js
async fetch (context) {

}
```

10. 我們會收到 vuex 給我們的一個物件 `context`，裡面有很多必須的工具，讓我們可以跟 vuex 互動。還有第二個參數叫做 `payload` 不過目前還沒有用到。
11. 在瀏覽器裡面，想要透過程式發送一個 HTTP 請求，我們可以使用 `fetch`。因為他是非同步操作，所以要記得補上 await。

```js
let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/products');
let body = await response.json();

console.log(body);
```

12. 接下來我們要把這個模組註冊到我們的 App 裡面。

13. 打開 `store.js`

```js
import Products from './stores/products';

// ... 略

modules: {
  Products
}
```

14. 回到 `Home.vue`

```js
mounted () {
  this.$store.dispatch('Products/fetch');
}
```

15. 如果剛才那些動作都正確無誤的話，我們應該會在 console 看到我們 API 的回應內容。
16. 回到 `store/products.js` 裡面，我們要把剛剛辛苦抓下來的東西存進 state 裡面。
17. 剛剛有提到，只有 mutation 可以改 state，所以我們現在要寫這個 mutation。

```js
mutations: {
  set (state, products) {
    state.products = products;
  }
}
```

18. 會到 `fetch` action，補上：

```js
context.commit('set', data.data);
```

19. 理論上做到這邊，我們的元件就可以吃到 `state.product` 的值了。
20. 但是為了好維護，我們想要縮限 `state` 可以被取用的管道，所以習慣上我們習慣在定義個 `getter` 來幫我們取得 `state.product` 的內容。

```js
getters: {
  all: state => state.product
}
```

21. 現在，一個 Vuex 模組的每個面向你都已經碰過，有所概念了。之後我們寫的另外幾個模組，都脫離不了這些。
22. 回到 Home 元件，我們現在要從 vuex 裡面取得產品資訊。

```js
computed: {
  products () {
    return this.$store.getters['Products/all'];
  }
}
```

23. 但是一個複雜一點網站，你可能會這樣類似 computed 的定義幾百次，這時候我們會使用 vuex 提供的一個方便工具，叫做 `mapGetter`。

```js
import { mapGetter } from 'vuex';

computed: {
  ...mapGetter({
    products: 'Product/all'
  })
}

```

24. 這時候，你應該可以看到你的產品列表跑回來了
25. 你可能會認為，抓個產品列表要做的事情這麼多，也太麻煩了吧。沒錯，但是大型專案，長期下來你省下的是抓 bug 的時間。但是小專案建議可以不用他。

26. 我們點進產品介紹頁後，我們也希望能夠馬上從伺服器取得完整的產品資訊。
27. 新增 `stores/product.js`

```js
export default {
  namespaced: true,
  state: {
    product: null
  },
  mutations: {
    set (state, product) {
      state.product = product
    }
  },
  actions: {
    async fetch (context, modelId) {
      let response = await fetch(`http://api-eshop.jaceju.macross7.kk-box.com/products/${modelId}`);
      let data = await response.json();

      context.commit('set', data.data);
    }
  },
  getters: {
    product: (state) => state.product
  }
}
```

28. 比較特別的地方是，我們這邊的 action 接受了第二個參數。他讓我們可以攜帶額外的資訊控制 action 要做的事情。這個例子呼叫這個 action 的人要告訴我，這個 action 要下載哪個 modelId 的產品資料。
29. 如果要帶多個資料，要自己包成物件再丟進來解開。
30. 回到 ProductDetail.vue

```js
import { mapGetters } from 'vuex';

...

{
   mounted () {
    this.$store.dispatch('Product/fetch', this.id);
  },
  computed: {
    ...mapGetters({
      product: 'Product/product'
    })
  }
}
```

# 第 4 章 前端認證管理，進階 API 呼叫

1. 有些 API 功能，會需要認證之後才可以使用。所以我們要做一個登入畫面，讓使用者輸入他的帳號密碼。如果正確，伺服器會給我一個金鑰 (一個字串)
2. 之後我們就可以憑這個金鑰去存取個人的 API
3. 這一次，我們從 store 這邊下手：
4. 建立一個檔案 `stores/user.js`

```js
export default {
  namespaced: true,
  state: {
    user: null
  },
  mutation: {
    set (state, user) {
      state.user = user;
    },
    clear (state) {
      state.user = null;
    }
  },
  actions: {
    async login (context, payload) {
      let email = payload.email;
      let password = payload.password;

      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // 我們要檢查伺服器的狀態碼是不是 200
      if (!response.ok) {
        // 不是的話丟錯誤出去
        throw new Error('fail');
      }

      let data = response.json();

      context.commit('set', data.data);
    }
  }
};
```

5. 建立 `Login.vue`

```html
<div class="login">
  <form>
    <div class="field">
      <label>電郵：<input type="email" v-model="email" /></label>
    </div>
    <div class="field">
      <label>密碼：<input type="password" v-model="password" /></label>
    </div>
    <button class="btn" type="submit">登出</button>
  </form>
</div>
```

```js
data () {
  return {
    email: '',
    password: ''
  }
}
```

6. v-model 讓我們可以將 <input> 的 value 跟 vue data 裡面的屬性進行雙向綁定。
7. 這讓我們可以在程式裡面吃到，使用者輸入的東西
8. 接下來我們要在使用者送出表單時，發一個 action 到 user store
9. 在 <form> 綁定 `submit` 事件
10. 加上 `.prevent`
11. 寫 handleSubmit

```js
async handleSubmit () {
  try {
    await this.$store.dispatch('User/login', { email: this.email, password: this.password });
    // 成功回首頁
    this.$router.push({ name: 'home' });
  } catch (error) {
    this.error = true;
  }
}
```

12. 應付失敗
13. HeaderMain 顯示登入狀態

```html
<li v-if="user">{{ user.email }}</li>
<li v-else><router-link :to="{ name: 'login' }">登入</router-link></li>
```

14. 重新整理之後，登入就不見了
15. 我們可以試著把登入狀態保存下來

```js

// @stores/user.actions.login
localStorage.setItem('kks::login', JSON.stringify(data.data));

// @stores/user.actions
restore (context) {
  let stored = localStorage.getItem('kks::login');

  if (stored) {
    context.commit('set', JSON.parse(stored));
  }
}

// @App.vue.created
this.$store.dispatch('User/restore');
```

16. 登出也很簡單

```js
logout (context) {
  context.commit('clear');
  localStorage.removeItem('kks::login');
}
```

```html
<li v-if="user">{{ user.email }} <a href="#" @click.prevent="handleLogout">登出</a></li>
```

```js
methods: {
  handleLogout () {
    this.$store.dispatch('User/logout');
  }
}
```

# 第 5 章 購物車增刪查

1. 接下來我們要能夠把商品加入購物車
2. 我們要呼叫 API `POST http://api-eshop.jaceju.macross7.kk-box.com/cart`
3. 但是這個 API 有點不同，他需要有會員身份才能呼叫，這會用到我們剛剛取得的 token。
4. 建立一個檔案 `stores/cart.js`

```js
export default {
  namespaced: true,
  state: {
    cart: []
  },
  mutations: {
    set (state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    async addItem (context, productId) {
      // 因為我們在模組裡面，我們所有稱呼的 action, getters, mutations 都會自動補上 namespace "cart"
      // 所以我們要存取其他模組的資訊，我們可以使用 rootGetters
      let user = context.rootGetters['User/user'];

      // 因為 user 可能是 null (沒有登入)，要記得檢查
      if (!user) {
        throw new Error('沒有登入');
      }

      let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/cart', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': 'Bearer ' + user.token
        },
        body: JSON.stringify({ productId })
      });

      return response.ok;
    }
  }
};
```

5. 產品內頁，加上

```html
<button class="btn btn-primary" @click="addToCart">加入購物車</button>
```

```js
addToCart () {
  this.$store.dispatch('Cart/addItem', this.product.variants[this.selected].id);
}
```

6. 列出購物車內容
7. 新增 action:

```js
async fetch (context) {
  let user = context.rootGetters['User/user'];

  if (!user) {
    throw new Error('沒有登入');
  }

  let response = await fetch('http://api-eshop.jaceju.macross7.kk-box.com/cart', {
    method: 'GET',
    headers: {
      'authorization': 'Bearer ' + user.token
    }
  });

  let data = await response.json();

  context.commit('set', data.data);
}
```

8. 新增 getter:

```js
getters: {
  items: (state) => state.cart
}
```

9. 基本頁面，新增 `Cart.vue`。加上 routing
10. 為了方便進出購物車頁面，我們把連結加在主選單上：

<template v-if="user">
  <li><router-link :to="{ name: 'cart' }">購物車</router-link></li>
  <li>{{ user.email }}</li>
  <li><a href="#" @click.prevent="handleLogout">登出</a></li>
</template>

11. `<template>` 元素不會在 HTML 實際 render 出東西，但是它可以讓我們 group 東西。所以這三個東西都需要同一個條件 `v-if`，用 <template> 就很方便。

12. 我們在這頁載入時，呼叫 `Cart/fetch` action
13. 列出項目：

```html
<template>
  <div class="cart">
    <h2>購物車內容</h2>
    <ol>
      <li v-for="item in items" :key="item.id">
        <div class="product-name">{{ item.product.name }}</div>
        <div class="quantity">{{ item.quantity }} 件</div>
        <div class="action"><a href="#" @click.prevent="remove">移除</a></div>
      </li>
    </ol>
  </div>
</template>
```

14. 實作移除項目功能

```js
async removeItem (context, itemId) {
  let user = context.rootGetters['User/user'];

  if (!user) {
    throw new Error('沒有登入');
  }

  let response = await fetch(`http://api-eshop.jaceju.macross7.kk-box.com/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer ' + user.token
    }
  });

  return response.ok;
},
```

```js
// Cart.vue
async removeItem (itemId) {
  await this.$store.dispatch('Cart/removeItem', itemId);
  await this.$store.dispatch('Cart/fetch');
}
```

15. 印出沒有商品

```html
<div v-if="items.length === 0">
  沒有任何商品
</div>
```

# 第 6 章 最終章

1. 我們今天要做的功能都已經完成了，但是我們可以做一些東西讓我們的網站更好。

## 標題列購物車數量
1. 在 `stores/cart.js` 加上 getter:

我們的購物車項目列表是個 array，每個項目都有一個 `quantity` 我們要把他 sum 起來。

```js
count: (state) => {
  return state.cart.reduce((sum, item) => {
    return sum += item.quantity;
  }, 0);
}
```

2. 在標題列加上

```html
<span class="badge">{{ cartCount }}</span>
```

3. 但是我們會發現，我們加入新項目時，他不會更新。因為我們沒有去 fetch 新的購物車下來 (現在只有在打開購物車頁的時候會做)
4. 我們可以在更新購物車的時候，都做一次 fetch。
5. User/login 和 User/restore 時，也跟著做一次。

```js
context.dispatch('Cart/fetch', null, { root: true });
```