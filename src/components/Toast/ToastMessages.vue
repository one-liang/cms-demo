<template>
  <div
    class="toast-container position-absolute pe-3 top-0 end-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style="z-index: 10"
  >
    <Toast v-for="(msg, index) in messages" :key="index" :msg="msg" />
  </div>
</template>

<script>
import Toast from './Toast.vue';

export default {
  name: 'ToastMessage',
  components: { Toast },
  inject: ['emitter'],
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      console.log({ message });
      this.messages.push({ style, title, content });
    });
  },
};
</script>
