const net = require("net");

const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
   clients.push(socket);
   console.log("connection success");

   socket.on("data", (data) => {
      clients.map((client) => {
         client.write(data.toString());
      });
   });
});

server.listen(4000, "127.0.0.1", () => {
   console.log("server is listening to 4000");
});
