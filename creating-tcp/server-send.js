const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 4000 }, () => {
   socket.write(Buffer.from("hey there this is the server"));
});
