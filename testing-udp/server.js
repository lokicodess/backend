const dgram = require("dgram");

const socket = dgram.createSocket("udp4");

socket.bind(9001, "127.0.0.1");

socket.on("message", function (msg, info) {
   console.log(msg.toString());
});
