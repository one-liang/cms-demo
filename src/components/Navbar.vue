<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
    <div class="container-fluid">
      <router-link to="/dashboard/products" class="navbar-brand">CMS</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/dashboard/products" class="nav-link">產品</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/orders" class="nav-link">訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/dashboard/coupons" class="nav-link">優惠券</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">登出</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.axios
        .post(api, this.user)
        .then((res) => {
          console.log('logout: ', res.data);
          if (res.data.success) {
            this.$router.push('/login');
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
