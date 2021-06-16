<template>
  <div>
    <Loading :active="isLoading"></Loading>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coupon, key) in coupons" :key="key">
          <td>{{ coupon.title }}</td>
          <td>{{ coupon.percent }}%</td>
          <td>{{ $filters.date(coupon.due_date) }}</td>
          <td>
            <span v-if="coupon.is_enabled === 1" class="text-success"
              >啟用</span
            >
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal(false, coupon)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openDelCouponModal(coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <CouponModal
      :coupon="tempCoupon"
      @update-coupon="updateCoupon"
      ref="couponModal"
    />
    <DeleteModal :item="tempCoupon" ref="delModal" @del-item="delCoupon" />
    <!-- <Pagination :pages="pagination" @emit-pages="getProducts" /> -->
  </div>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue';
import DeleteModal from '@/components/DeleteModal.vue';
// import ProductModal from '@/components/ProductModal.vue';

export default {
  name: 'Coupons',
  components: {
    CouponModal,
    DeleteModal,
    // Pagination,
  },
  data() {
    return {
      isLoading: false,
      isNew: false,
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 0,
        code: '',
      },
      pagination: {},
    };
  },
  inject: ['emitter'],
  created() {
    this.getCoupons();
  },
  methods: {
    getCoupons() {
      console.log('getCoupons: ');
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`;
      this.isLoading = true;
      this.axios
        .get(api)
        .then((res) => {
          if (res.data.success) {
            console.log('getCoupons: ', res.data);
            this.coupons = res.data.coupons;
            this.isLoading = false;
          }
        })
        .catch((error) => console.log(error));
    },
    openCouponModal(isNew, item) {
      console.log('openCouponModal: ', isNew, item);
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          title: this.tempCoupon.title,
          is_enabled: this.tempCoupon.is_enabled,
          percent: this.tempCoupon.percent,
          code: this.tempCoupon.code,
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(coupon) {
      // console.log('openDelCouponModal: ', coupon);
      this.tempCoupon = { ...coupon };
      this.$refs.delModal.showModal();
    },
    delCoupon() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
      this.axios
        .delete(api)
        .then((res) => {
          this.$refs.delModal.hideModal();
          if (res.data.success) {
            console.log('delCoupon: ', res.data);
            this.getCoupons();
          }
        })
        .catch((error) => console.log(error));
    },
    updateCoupon(tempCoupon) {
      console.log('updateCoupon: ', tempCoupon);
      if (this.isNew) {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`;
        this.axios.post(url, { data: tempCoupon }).then((res) => {
          if (res.data.success) {
            console.log('新增優惠券: ', res.data);
            this.getCoupons();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
            this.$refs.couponModal.hideModal();
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
          .catch((error) => console.log(error));
      } else {
        const url = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`;
        this.axios.put(url, { data: this.tempCoupon }).then((res) => {
          if (res.data.success) {
            console.log('修改優惠券: ', res.data);
            this.getCoupons();
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功',
            });
            this.$refs.couponModal.hideModal();
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、'),
            });
          }
        })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
