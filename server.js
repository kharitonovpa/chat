const { WSServer } = require("./server/wsServer");

const wsPort = 3001;
const wsServer = new WSServer();
wsServer.start(wsPort);