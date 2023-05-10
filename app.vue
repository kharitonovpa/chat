<template>
  <div>
    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script lang="ts">

export default defineComponent({
  setup() {
    const message = ref('');
    const messages = ref<string[]>([]);
    let socket: WebSocket;

    onMounted(() => {
      socket = new WebSocket(`ws://localhost:3001`);

      socket.addEventListener('message', (event) => {
        messages.value.push(event.data);
      });
    });

    onUnmounted(() => {
      socket.close();
    });

    function sendMessage() {
      if (message.value.trim()) {
        socket.send(message.value);
        message.value = '';
      }
    }

    return {
      message,
      messages,
      sendMessage,
    };
  },
});
</script>