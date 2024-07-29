const net = require("net");
const fs = require("fs/promises");

const server = net.createServer(() => {});

let fileHandler, writeStream;

server.on("connection", async (socket) => {
   readBytes(socket);
   console.log("connected with client");
});

async function readBytes(socket) {
   try {
      socket.on("data", async (data) => {
         if (!fileHandler) {
            socket.pause();
            const divider = data.toString("utf-8").indexOf("---");
            const fileName = data.subarray(0, divider);
            data = data.subarray(divider + 4);
            fileHandler = await fs.open(`./storage/${fileName}`, "w");
            writeStream = fileHandler.createWriteStream();
            socket.resume();
         }

         if (!writeStream.write(data)) {
            socket.pause();
         }
      });

      writeStream.on("drain", () => {
         socket.resume();
      });

      socket.on("end", () => {
         console.log("connection ended");
         fileHandler.close();
         fileHandler = undefined;
      });
   } catch (error) {}
}

server.listen(5055, "::1", () => {
   console.log("server is listening to port 4000");
});
