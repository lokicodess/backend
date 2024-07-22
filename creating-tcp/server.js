const net = require("net");

const server = net.createServer((socket) => {
   socket.on("data", (data) => {
      console.log(data.toString());
   });
});

server.listen(4000, "127.0.0.1", () => {
   console.log("server is listening to", server.address());
});
