<template>
  <div>
    Dashboard
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.axios.defaults.headers.common.Authorization = `${token}`;
    const api = `${process.env.VUE_APP_API}/api/user/check`;

    this.axios.post(api, this.user)
      .then((res) => {
        console.log('dashboard: ', res.data);
        if (!res.data.success) {
          this.$router.push('login');
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>
