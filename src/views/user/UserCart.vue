<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${product.imageUrl})` }"
                ></div>
              </td>
              <td>
                <router-link
                  :to="`/user/product/${product.id}`"
                  class="text-dark"
                  >{{ product.title }}</router-link
                >
              </td>
              <td>
                <div class="h5" v-if="!product.price">
                  {{ product.origin_price }} 元
                </div>
                <del class="h6" v-if="product.price"
                  >原價 {{ product.origin_price }} 元</del
                >
                <div class="h5" v-if="product.price">
                  現在只要 {{ product.price }} 元
                </div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="getProduct(product.id)"
                  >
                    查看更多
                  </button>
                  <button
                    @click="addToCart(product.id)"
                    type="button"
                    class="btn btn-outline-danger"
                    :disabled="loadingItem === product.id"
                  >
                    <span v-if="loadingItem !== product.id">加到購物車</span>
                    <div
                      v-else
                      class="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 購物車列表 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCart',
  data() {
    return {
      products: [],
      isLoading: false,
      loadingItem: '',
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            console.log('products: ', res.data);
            this.products = res.data.products;
          }
        })
        .catch((error) => console.log(error));
    },
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addToCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.loadingItem = id;
      this.axios
        .post(api, { data: cart })
        .then((res) => {
          this.loadingItem = '';
          if (res.data.success) {
            console.log('addToCart: ', res.data);
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
