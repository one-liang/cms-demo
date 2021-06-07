<template>
  <router-view />
</template>

<script>
export default {
  created() {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH);
  },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
