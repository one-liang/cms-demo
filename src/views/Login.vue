<template>
  <div class="container">
    <form
      class="form-signin"
      @submit.prevent="signIn"
    >
      <h1 class="h3 mb-3 font-weight-normal">
        請先登入
      </h1>
      <div class="form-group mb-2">
        <label
          for="inputEmail"
          class="sr-only"
        >Email address</label>
        <input
          id="inputEmail"
          v-model="user.username"
          type="email"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        >
      </div>
      <div class="form-group mb-4">
        <label
          for="inputPassword"
          class="sr-only"
        >Password</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        >
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        登入
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.axios.post(api, this.user)
        .then((res) => {
          console.log('login: ', res.data);
          const { token, expired } = res.data;
          document.cookie = `myToken=${token}; expires=${new Date(expired)}`;
          if (res.data.success) {
            this.$router.push('/dashboard');
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
