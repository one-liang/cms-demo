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
      <div class="col-md-5">
        <div class="sticky-top">
          <table class="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style="width: 110px">數量</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="cart.carts">
                <tr v-for="item in cart.carts" :key="item.id">
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm"
                      :disabled="loadingItem === item.id"
                      @click="removeCartItem(item.id)"
                    >
                      <i class="bi bi-trash2-fill"></i>
                    </button>
                  </td>
                  <td>
                    {{ item.product.title }}
                    <div class="text-success" v-if="item.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td>
                    <div class="input-group input-group-sm">
                      <input
                        type="number"
                        class="form-control"
                        min="1"
                        :disabled="loadingItem === item.id"
                        v-model.number="item.qty"
                        @change="updateCart(item)"
                      />
                      <div class="input-group-text">
                        / {{ item.product.unit }}
                      </div>
                    </div>
                  </td>
                  <td class="text-end">
                    <small
                      v-if="cart.final_total !== cart.total"
                      class="text-success"
                      >折扣價：</small
                    >
                    {{ $filters.currency(item.final_total) }}
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end">總計</td>
                <td class="text-end">{{ $filters.currency(cart.total) }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-end text-success">折扣價</td>
                <td class="text-end text-success">
                  {{ $filters.currency(cart.final_total) }}
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              class="form-control"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="addCouponCode"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
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
      cart: {},
      coupon_code: '',
    };
  },
  created() {
    this.getProducts();
    this.getCart();
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
            this.getCart();
          }
        })
        .catch((error) => console.log(error));
    },
    getCart() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`;
      this.isLoading = true;
      this.axios.get(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          console.log('getCart: ', res);
          this.cart = res.data.data;
        }
      });
    },
    updateCart(item) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      this.loadingItem = item.id;
      this.axios.put(api, { data: cart }).then((res) => {
        if (res.data.success) {
          this.loadingItem = '';
          console.log('updateCart: ', res);
          this.getCart();
        }
      });
    },
    removeCartItem(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.isLoading = true;
      this.axios.delete(api).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          console.log('removeCartItem: ', res);
          this.getCart();
        }
      });
    },
    // ! todo
    addCouponCode() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.axios.post(api, { data: coupon }).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          console.log('addCouponCode: ', res);
          this.getCart();
        }
      });
    },
  },
};
</script>
