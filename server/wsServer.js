class WSServer {
  constructor() {
    this.wss = null;
  }

  start(port) {
    const WebSocket = require("ws");
    this.wss = new WebSocket.Server({ port });

    this.wss.on("connection", (socket) => {
      console.log("Client connected");

      socket.on("message", (message) => {
        console.log(`Received: ${message}`);
        this.wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      });

      socket.on("close", () => {
        console.log("Client disconnected");
      });
    });

    console.log(`WebSocket server is running on port ${port}`);
  }
}

module.exports = { WSServer };