<template>
  <div class="text-end">
    <button @click="openModal" class="btn btn-primary" type="button">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-right">{{ product.origin_price }}</td>
        <td class="text-right">{{ product.price }}</td>
        <td>
          <span v-if="product.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm">編輯</button>
            <button class="btn btn-outline-danger btn-sm">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
</template>

<script>
import ProductModal from '../components/ProductModal.vue';

export default {
  name: 'Products',
  components: {
    ProductModal,
  },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products`;
      this.axios.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log('products: ', res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((error) => console.log(error));
    },
    openModal() {
      this.tempProduct = {};
      this.$refs.productModal.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      this.axios.post(api, { data: this.tempProduct })
        .then((res) => {
          console.log('updateProduct: ', res);
          this.$refs.productModal.hideModal();
          this.getProducts();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>