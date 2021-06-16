<template>
  <Loading :active="isLoading"></Loading>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(order, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !order.is_paid }">
          <td>{{ $filters.date(order.create_at) }}</td>
          <td><span v-text="order.user.email" v-if="order.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in order.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                v-model="order.is_paid"
                @change="updateOrder(order)"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openModal(order)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrderModal(order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <OrderModal :order="tempOrder" @update-order="updateOrder" ref="orderModal" />
  <DeleteModal :item="tempOrder" ref="delModal" @del-item="delOrder" />
  <Pagination :pages="pagination" @emit-pages="getOrders" />
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import OrderModal from '@/components/OrderModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'Orders',
  components: {
    Pagination,
    OrderModal,
    DeleteModal,
  },
  inject: ['emitter'],
  data() {
    return {
      isLoading: false,
      orders: {},
      tempOrder: {},
      pagination: {},
      currentPage: 1,
    };
  },
  created() {
    this.getOrders();
  },
  methods: {
    getOrders(currentPage = 1) {
      this.currentPage = currentPage;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            console.log('getOrders: ', res.data);
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
            this.isLoading = false;
          }
        })
        .catch((error) => console.log(error));
    },
    openModal(order) {
      console.log('openModal: ', order);
      this.tempOrder = { ...order };
      this.$refs.orderModal.showModal();
    },
    updateOrder(order) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${order.id}`;
      const paid = {
        is_paid: order.is_paid,
      };
      this.axios.put(api, { data: paid }).then((res) => {
        console.log('updateOrder: ', res.data);
        this.$refs.orderModal.hideModal();

        if (res.data.success) {
          this.getOrders(this.currentPage);
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
      });
    },
    openDelOrderModal(order) {
      console.log('openDelOrderModal: ', order);
      this.tempOrder = { ...order };
      this.$refs.delModal.showModal();
    },
    delOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`;
      this.axios
        .delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          if (res.data.success) {
            console.log('delOrder: ', res.data);
            this.getOrders(this.currentPage);
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
