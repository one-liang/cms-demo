<template>
  <Loading :active="isLoading"  />
  <div class="text-end">
    <button @click="openModal(true)" class="btn btn-primary" type="button">
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
        <td class="text-right">{{ $filters.currency(product.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(product.price) }}</td>
        <td>
          <span v-if="product.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              @click="openModal(false, product)"
              class="btn btn-outline-primary btn-sm"
            >
              編輯
            </button>
            <button
              @click="openDelModal(product)"
              class="btn btn-outline-danger btn-sm"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <Pagination :pages="pagination" @emit-pages="getProducts" />
  <ProductModal
    ref="productModal"
    :product="tempProduct"
    @update-product="updateProduct"
  />
  <DeleteModal ref="delModal" :item="tempProduct" @del-item="delProduct" />
</template>

<script>
import DeleteModal from '../components/DeleteModal.vue';
import Pagination from '../components/Pagination.vue';
import ProductModal from '../components/ProductModal.vue';

export default {
  name: 'Products',
  components: {
    ProductModal,
    DeleteModal,
    Pagination,
  },
  inject: ['emitter'],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            console.log('products: ', res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((error) => console.log(error));
    },
    openModal(isNew, item) {
      console.log(isNew, item);
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      this.isNew = isNew;
      this.$refs.productModal.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;

      // 新增
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';

      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      this.axios[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          console.log('updateProduct: ', res);
          this.$refs.productModal.hideModal();
          if (res.data.success) {
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        .catch((error) => console.log(error));
    },
    openDelModal(product) {
      // console.log('openDelModal: ', product);
      this.tempProduct = { ...product };
      this.$refs.delModal.showModal();
    },
    delProduct() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.axios
        .delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          if (res.data.success) {
            console.log('delProduct: ', res.data);
            this.getProducts();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
