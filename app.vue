<template>
  <div>
    {{ messages }}
    <input v-model="message" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client'

export default defineComponent({
  setup() {
    const message = ref('');
    const messages = ref<string[]>([]);
    let socket: WebSocket;

    onMounted(() => {
      console.log('location.protocol', location.origin)
      console.log('location.host', location.host)
      socket = io(location.origin);
      console.log('socket', socket)

      socket.addEventListener('message', (event) => {
        console.log('event', event)
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